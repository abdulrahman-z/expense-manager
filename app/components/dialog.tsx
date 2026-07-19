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
import { categories, Payments, subCategories } from "../types/types";

export default function ExpenseFormView({
  dialogTrigger,
  dialogTitle,
}: {
  dialogTrigger: string;
  dialogTitle: string;
}) {
  return (
    <Dialog>
      <form>
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
        <DialogContent className='sm:max-w-sm py-3 px-4'>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{""}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                defaultValue=''
                placeholder='Enter expense title'
              />
            </Field>
            <Field>
              <Label htmlFor='date'>Date</Label>
              <Input id='date' type='date' name='date' defaultValue='' />
            </Field>
            <Field>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                type='number'
                min={0}
                name='amount'
                defaultValue=''
              />
            </Field>
            <Field>
              <SelectMenu items={Payments} />
            </Field>
            <Field>
              <SelectMenu items={categories} />
            </Field>
            <Field>
              <SelectMenu items={subCategories} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>Cancel</Button>} />
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
