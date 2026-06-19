import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function PlayerHandSelect({
  value,
  onChange,
}: Props) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Right">
          Right
        </SelectItem>

        <SelectItem value="Left">
          Left
        </SelectItem>
      </SelectContent>
    </Select>
  );
}