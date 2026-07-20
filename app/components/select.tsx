import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectMenu({
  items,
  id,
  name,
}: {
  items: { label: string; value: null | string }[];
  id: string;
  name: string;
}) {
  return (
    <Select items={items} name={name}>
      <SelectTrigger id={id} className='w-full max-w-full'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select</SelectLabel> */}
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
