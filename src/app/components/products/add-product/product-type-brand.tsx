import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  Control,
} from "react-hook-form";
import ErrorMsg from "../../common/error-msg";
import ProductType from "./product-type";

// prop type
type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<React.SetStateAction<string>>;
  default_value?: {
    product_type: string;
  };
};

const ProductTypeBrand = ({
  register,
  errors,
  control,
  setSelectProductType,
  default_value,
}: IPropType) => {
  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-x-6">
        <div className="mb-5">
          <p className="mb-0 text-base text-black">ProductType</p>
          <ProductType
            control={control}
            errors={errors}
            default_value={default_value?.product_type}
            setSelectProductType={setSelectProductType}
          />
          <span className="text-tiny leading-4">
            Set the product ProductType.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeBrand;

