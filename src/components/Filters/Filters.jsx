import { Form, useLoaderData } from "react-router-dom";
import clsx from "clsx";

import styles from "./Filters.module.scss";
import FormInput from "../FormInput";
import Button from "../Button";
import FormSelect from "../FormSelect";
import FormRange from "../FormRange";
import FormCheckBox from "../FormCheckbox";

function Filters() {
   const { meta, params } = useLoaderData();
   const { search, company, category, order, price, shipping } = params;
   return (
      <Form className={clsx(styles.form)}>
         <FormInput
            type='search'
            name='search'
            label='search product'
            size='size'
            defaultValue={search}
         />
         <FormSelect
            list={meta.categories}
            name='category'
            label='Select category'
            defaultValue={category}
         />
         <FormSelect
            list={meta.companies}
            name='company'
            label='Select company'
            defaultValue={company}
         />
         <FormSelect
            list={["a-z", "z-a", "hight", "low"]}
            name='order'
            label='Sort by'
            defaultValue={order}
         />
         <FormRange name='price' label='select price' price={price} />
         <FormCheckBox
            label='free shipping'
            name='shipping'
            defaultValue={shipping}
         />
         <Button type='submit' primary='primary' size='size'>
            Search
         </Button>
         <Button to='/products' accent='accent' size='size'>
            reset
         </Button>
      </Form>
   );
}

export default Filters;
