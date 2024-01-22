import { Anchor, Box, Container } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ReviewSettings } from '../components/ReviewSettings';

export function Settings() {
  return (
    <Container mt={12}>
      <Box>
        <Anchor to="/" underline="hover" component={Link}>
          Back
        </Anchor>
      </Box>
      <ReviewSettings />
    </Container>
  );
}
