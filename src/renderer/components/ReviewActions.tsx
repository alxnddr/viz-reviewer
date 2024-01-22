import { Button, Center, Container, Group } from '@mantine/core';

interface ReviewActionsProps {
  path: string;
  onBad: () => void;
  onGood: () => void;
  onPostpone: () => void;
  onBack: () => void;
}

export function ReviewActions({
  path,
  onBad,
  onGood,
  onPostpone,
  onBack,
}: ReviewActionsProps) {
  return (
    <Container py={12}>
      <Button onClick={() => onBack()}>Back</Button>
      <Center>{path}</Center>
      <Group justify="center" my={12}>
        <Button size="xl" color="red" w={150} onClick={() => onBad()}>
          Bad
        </Button>
        <Button size="xl" color="green" w={150} onClick={() => onGood()}>
          Good
        </Button>
      </Group>
      <Center>
        <Button onClick={() => onPostpone()} color="gray">
          Skip
        </Button>
      </Center>
    </Container>
  );
}
