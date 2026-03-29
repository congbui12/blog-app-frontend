import { AlertDialog, Flex, Button } from '@radix-ui/themes';

interface AppAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  cancelLabel?: string;
  actionLabel?: string;
  onAction: () => Promise<void> | void;
}

const AppAlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  cancelLabel = 'Cancel',
  actionLabel = 'Confirm',
  onAction,
}: AppAlertDialogProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title color="red">{title}</AlertDialog.Title>
        {description && <AlertDialog.Description size="2">{description}</AlertDialog.Description>}
        <Flex gap="3" mt="6" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" radius="large">
              {cancelLabel}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onAction} variant="solid" color="ruby" radius="large">
              {actionLabel}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AppAlertDialog;
