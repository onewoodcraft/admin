import React,{useEffect} from "react";
import ReactSelect from "react-select";
import { FieldErrors, Controller, Control } from "react-hook-form";
import ErrorMsg from "../../common/error-msg";

// prop type
type IPropType = {
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<React.SetStateAction<string>>;
  default_value?:string;
};

const ProductType = ({
  errors,
  control,
  default_value,
  setSelectProductType,
}: IPropType) => {
  // handleSelectProduct
  const handleSelectProduct = (value: string) => {
    setSelectProductType(value);
  };
  // set default product
  useEffect(() => {
    if(default_value){
      setSelectProductType(default_value)
    }
  }, [default_value, setSelectProductType])
  
  return (
    <>
      <Controller
        name="productType"
        control={control}
        rules={{
          required: default_value
            ? false
            : "productType is required!",
        }}
        render={({ field }) => {
          // List of options
          const options = [
            { value: "chopping-boards", label: "Chopping Boards" },
            { value: "platters", label: "Platters" },
            { value: "trays", label: "Trays" },
            { value: "planters", label: "Planters" },
            { value: "bowls", label: "Bowls" },
            { value: "cake-stands", label: "Cake Stands" },
            { value: "gifting", label: "Gifting" },
          ];
          // Find the selected option object
          const selectedOption = (typeof field.value === 'string' && field.value && field.value !== undefined) ? options.find(opt => opt.value === field.value) : null;
          const defaultOption = (typeof default_value === 'string' && default_value && default_value !== undefined) ? options.find(opt => opt.value === default_value) : null;
          return (
            <ReactSelect
              {...field}
              value={selectedOption}
              defaultValue={defaultOption}
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.value);
                handleSelectProduct(selectedOption?.value);
              }}
              options={options}
            />
          );
        }}
      />
      <ErrorMsg msg={errors?.productType?.message as string} />
    </>
  );
};

export default ProductType;
