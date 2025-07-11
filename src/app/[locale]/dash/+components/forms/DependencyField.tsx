"use client";

import Button from "@/components/UI/Button";
import Select from "@/components/UI/inputs/Select";
import TextInput from "@/components/UI/inputs/TextInput";
import Skeleton from "@/components/UI/skeleton";
import useFetchedData from "@/hooks/useFetchedData";
import { variables } from "@/locales/variables";
import getTranslation, { TLanguages } from "@/utils/getTranslation";
import { useEffect, useRef, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
type Dependency = Array<{ label: string; value: number; id: number }>;
export default function DependencyField({
  onChange,
  error,
  value,
  hasDefaultValue,
  locale,
}: {
  onChange: React.Dispatch<
    React.SetStateAction<Array<{
      label: string;
      value: number;
      id: number;
    }> | null>
  >;
  error:
    | Merge<FieldError, FieldErrorsImpl<{ value: number; discount: number }>>
    | undefined;
  value?: Dependency;
  hasDefaultValue: boolean;
  locale: TLanguages;
}) {
  const { data, loading } = useFetchedData<InventoryItem[]>(`api/inventory`);
  const [selectedDep, setSelectedDep] = useState<Dependency>([]);
  const options = data?.map((i) => {
    return { value: i.title, label: i.title };
  });
  function selectedValuesChangeHandler(selectedValues: string | string[]) {
    if (Array.isArray(selectedValues)) {
      selectedValues.forEach((selected) => {
        const isNew = !selectedDep.map((i) => i["label"]).includes(selected);
        if (isNew) {
          setSelectedDep([
            ...selectedDep,
            {
              label: selected,
              value: 10,
              id:
                data?.filter((d) => d.title === selected).map((d) => d.id)[0] ??
                0,
            },
          ]);
        } else {
        }
      });
    }
  }
  const didInit = useRef(false);

  useEffect(() => {
    if (hasDefaultValue) {
      if (!didInit.current) {
        if (value) {
          setSelectedDep(value);
          didInit.current = true;
        }
      }
    } else {
      didInit.current = true;
    }
  }, [value, hasDefaultValue]);

  useEffect(() => {
    if (didInit.current) {
      onChange(selectedDep);
    }
  }, [selectedDep, onChange]);
  const t = getTranslation(locale, variables);
  return (
    <section className="md:max-w-[800px]">
      {loading ? (
        <div className="my-6">
          <p className=" text-[18px]">Food dependency</p>
          <Skeleton width="354px" height="53px" rounded="xl" />
        </div>
      ) : (
        options && (
          <>
            <Select
              fullWidth
              options={options}
              value={selectedDep.map((i) => i.label)}
              label={t("add.form.dependency.select_label")}
              className="my-6 text-[18px] max-w-[354px]"
              multiple
              searchable
              onChange={selectedValuesChangeHandler}
              error={error?.message ? true : false}
              errorMessage={error?.message}
            />
            <section className="flex flex-row flex-wrap gap-6">
              {selectedDep.map((dep, index) => (
                <div key={dep.label} className="flex flex-row ">
                  <TextInput
                    type="number"
                    label={dep.label}
                    step={10}
                    min={10}
                    value={selectedDep[index].value}
                    icon={
                      data
                        ?.map((d) => {
                          return { unit: d.unit, label: d.title };
                        })
                        .find((i) => i.label === dep.label)?.unit
                    }
                    iconPosition="right"
                    onChange={(v) => {
                      const value = isNaN(v.target.valueAsNumber)
                        ? 0
                        : v.target.valueAsNumber;
                      const newObj = {
                        label: selectedDep[index].label,
                        value: value,
                        id: selectedDep[index].id,
                      };
                      selectedDep[index] = newObj;
                      setSelectedDep([...selectedDep]);
                    }}
                  />
                  <Button
                    variant="secondary"
                    className="rounded-full py-2 mt-8 ml-2 "
                    onClick={() => {
                      const filterDeps = selectedDep.filter(
                        (d) => d.label !== dep.label
                      );
                      setSelectedDep([...filterDeps]);
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
            </section>
          </>
        )
      )}
    </section>
  );
}
