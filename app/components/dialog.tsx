"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectMenu from "./select";
import {
  categories,
  Payments,
  subCategories,
  transaction,
} from "../types/types";
import { createExpense, FormState, updateExpense } from "../actions/expenses";
import { useActionState, useRef, useState } from "react";
import { dateFormatter } from "@/lib/utils";

export default function ExpenseFormView({
  dialogTrigger,
  dialogTitle,
  expenseData,
}: {
  dialogTrigger: string;
  dialogTitle: string;
  expenseData?: transaction;
}) {
  const initialState: FormState = { canSubmit: false, errors: {} };
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const action = expenseData
    ? updateExpense.bind(null, expenseData?.id)
    : createExpense;

  const handleSubmit = async (prevState: FormState, formData: FormData) => {
    const result = await action(prevState, formData);
    if (result.canSubmit) {
      formRef.current?.reset();
      setOpen(false);
    }
    return result;
  };
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className={"bg-white"}
            variant={dialogTrigger === "Add" ? "outline" : "ghost"}
          >
            {dialogTrigger}
          </Button>
        }
      />
      <DialogContent className='sm:max-w-sm h-[500] py-3 px-4 overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction}>
          <FieldGroup>
            <Field>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                placeholder='Enter expense title'
                defaultValue={expenseData?.title}
              />
              {state.errors?.title && (
                <p className='text-red-400 font-medium'>{state.errors.title}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                type='number'
                min={0}
                name='amount'
                defaultValue={expenseData?.amount}
              />
              {state.errors?.amount && (
                <p className='text-red-400 font-medium'>
                  {state.errors.amount}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor='date'>Date</Label>
              <Input
                id='date'
                type='date'
                min={0}
                name='date'
                defaultValue={
                  expenseData?.date && dateFormatter(expenseData?.date)
                }
              />
              {state.errors?.date && (
                <p className='text-red-400 font-medium'>{state.errors.date}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor='payment'>Payment Type</Label>
              <SelectMenu
                items={Payments}
                id='payment'
                name='payment'
                defaultValue={expenseData?.paymentType}
              />
              {state.errors?.paymentType && (
                <p className='text-red-400 font-medium'>
                  {state.errors.paymentType}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor='category'>Category</Label>
              <SelectMenu
                items={categories}
                id='category'
                name='category'
                defaultValue={expenseData?.category}
              />
              {state.errors?.category && (
                <p className='text-red-400 font-medium'>
                  {state.errors.category}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor='subcategory'>Sub Category</Label>
              <SelectMenu
                items={subCategories}
                id='subcategory'
                name='subcategory'
                defaultValue={expenseData?.subCategory}
              />
              {state.errors?.subCategory && (
                <p className='text-red-400 font-medium'>
                  {state.errors.subCategory}
                </p>
              )}
            </Field>
            {state.errors?.general && (
              <p className='text-red-400 font-medium'>{state.errors.general}</p>
            )}
          </FieldGroup>
          <DialogFooter className='mt-5'>
            <DialogClose render={<Button variant='outline'>Cancel</Button>} />
            <Button type='submit' disabled={isPending}>
              {isPending ? "Saving..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
