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
import { CirclePlus } from "lucide-react";

const emptyForm = {
  title: "",
  amount: "",
  date: "",
  category: "",
  paymentType: "",
  subCategory: "",
};

function updateForm(expenseData?: transaction) {
  return expenseData
    ? {
        title: expenseData.title ?? "",
        amount: String(expenseData.amount ?? ""),
        date: expenseData.date ? dateFormatter(expenseData.date) : "",
        paymentType: expenseData.paymentType ?? "",
        category: expenseData.category ?? "",
        subCategory: expenseData.subCategory ?? "",
      }
    : emptyForm;
}

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
  const [formValues, setFormValues] = useState(() => updateForm(expenseData));

  const handleDialogOpen = (isOpen: boolean) => {
    if (open) {
      setFormValues(updateForm(expenseData));
    }
    setOpen(isOpen);
  };

  const action = expenseData
    ? updateExpense.bind(null, expenseData?.id)
    : createExpense;

  const handleSubmit = async (prevState: FormState, formData: FormData) => {
    const result = await action(prevState, formData);
    if (result.canSubmit) {
      formRef.current?.reset();
      setFormValues(emptyForm);
      setOpen(false);
    }
    return result;
  };
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  const updateField =
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormValues((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={handleDialogOpen}>
      <DialogTrigger
        render={
          <Button
            className={"bg-white"}
            variant={dialogTrigger === "Add" ? "outline" : "ghost"}
          >
            {dialogTrigger === "Add" ? <CirclePlus /> : dialogTrigger}
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
                value={formValues.title}
                onChange={updateField("title")}
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
                value={formValues.amount}
                onChange={updateField("amount")}
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
                value={formValues.date}
                onChange={updateField("date")}
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
                value={formValues.paymentType}
                onValueChange={(val: string) => {
                  setFormValues((prev) => ({ ...prev, paymentType: val }));
                }}
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
                value={formValues.category}
                onValueChange={(val: string) =>
                  setFormValues((prev) => ({ ...prev, category: val }))
                }
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
                value={formValues.subCategory}
                onValueChange={(val: string) =>
                  setFormValues((prev) => ({ ...prev, subCategory: val }))
                }
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
