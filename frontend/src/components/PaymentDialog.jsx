import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog";

const PaymentDialog = ({ triggerText, details, onSubmit, onChange }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">{triggerText}</Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
          <DialogDescription>Ask user for their credit card</DialogDescription>
        </DialogHeader>
        <form id="payment" className="grid grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="text-muted-foreground">Credit Card Number</label>
            <Input
              value={details.creditCardNumber}
              id="card"
              onChange={onChange}
              required
              placeholder="XXXX XXXX XXXX XXXX "
              minlength={16}
              maxlength={16}
            />
          </div>

          <div>
            <label className="text-muted-foreground">Expiry Date</label>
            <Input
              value={details.creditCardExpiry}
              id="expiry"
              onChange={onChange}
              required
              placeholder="MMYY"
              minlength={4}
              maxlength={4}
              type="number"
            />
          </div>

          <div>
            <label className="text-muted-foreground">CVV</label>
            <Input
              value={details.creditCardCVV}
              id="cvv"
              onChange={onChange}
              required
              placeholder="CVV"
              minlength={3}
              maxlength={3}
              type="number"
            />
          </div>
          <Button form="payment" className="col-span-full" onClick={onSubmit}>
            Done
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
