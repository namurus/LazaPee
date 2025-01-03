import { Dialog, DialogTrigger } from '../ui/dialog';

function DialogWrapper({ children, dialogContent }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}

export default DialogWrapper;
