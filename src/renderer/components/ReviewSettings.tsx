import { Button, Divider, Flex, Group, Input, Stack, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

type ReviewSettingsFormValues = {
  hostA: string;
  hostB: string;
};

export function ReviewSettings() {
  const form = useForm<ReviewSettingsFormValues>({
    initialValues: {
      hostA: window.electron.store.get('hostA'),
      hostB: window.electron.store.get('hostB'),
    },
  });

  const handleSave = ({ hostA, hostB }: ReviewSettingsFormValues) => {
    window.electron.store.set('hostA', hostA);
    window.electron.store.set('hostB', hostB);

    notifications.show({
      title: 'Saved',
      message: 'Host urls has been saved',
    });
  };

  const [paths, setPaths] = useState('');

  const handleImport = () => {
    const pathsObjects = paths.split('\n').map((path) => {
      const trimmedPath = path.trim();
      return {
        path: trimmedPath,
        status: 'pending',
      };
    });
    window.electron.store.set('reviewItems', pathsObjects);

    notifications.show({
      title: 'Success',
      message: 'Paths have been imported',
    });
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => handleSave(values))}>
        <Flex direction="row">
          <Group grow wrap="nowrap" w="100%" mr="md">
            <Input.Wrapper label="Host A">
              <Input
                placeholder="https://localhost:3000"
                {...form.getInputProps('hostA')}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Host B">
              <Input
                placeholder="https://localhost:3001"
                {...form.getInputProps('hostB')}
              />
            </Input.Wrapper>
          </Group>

          <Button mt="auto" miw="100px" type="submit">
            Save
          </Button>
        </Flex>

        <Divider mt="xl" />
      </form>

      <Flex direction="row">
        <Group grow wrap="nowrap" w="100%" mr="md">
          <Input.Wrapper label="Load paths">
            <Textarea
              placeholder="https://localhost:3001"
              value={paths}
              onChange={(e) => setPaths(e.currentTarget.value)}
            />
          </Input.Wrapper>
        </Group>

        <Button mt="auto" miw="100px" onClick={handleImport}>
          Load
        </Button>
      </Flex>
    </Stack>
  );
}
