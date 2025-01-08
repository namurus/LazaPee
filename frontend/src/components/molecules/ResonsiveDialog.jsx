import { DialogTitle } from '@radix-ui/react-dialog';
import { useIsMobile } from '../../hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
function ResponsiveDialog({ children, isOpen, setIsOpen, title, description }) {
  const isMobile = useIsMobile();
  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant={'outline'}>Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ResponsiveDialog;
