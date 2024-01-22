import {
  Box,
  Button,
  Container,
  Group,
} from '@mantine/core';
import { ReviewPathsTable } from '../components/ReviewPathsTable';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReviewActions } from '../components/ReviewActions';
import { ReviewItem, ReviewStatus } from '../types';


export function Home() {
  const [reviewItems, setReviewItems] = useState(
    window.electron.store.get('reviewItems'),
  );
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState<null | number>(null);

  const hostA = window.electron.store.get('hostA');
  const hostB = window.electron.store.get('hostB');

  const openPath = (path: string) => {
    window.electron.ipcRenderer.openPaths(
      `${hostA}/${path}`,
      `${hostB}/${path}`,
    );
  };

  const updateReviewIndex = (items: ReviewItem[]) => {
    const nextIndex = items.findIndex((item) => item.status === 'pending');
    const nextItem = reviewItems[nextIndex];
    setReviewIndex(nextIndex);
    openPath(nextItem.path);
  };

  const handleOpenReview = () => {
    const nextIndex = reviewItems.findIndex(
      (item) => item.status === 'pending',
    );

    if (nextIndex === -1) {
      setIsReviewing(false);
      setReviewIndex(null);
      return;
    }
    const nextItem = reviewItems[nextIndex];
    openPath(nextItem.path);

    setReviewIndex(nextIndex);
    setIsReviewing(true);
  };

  const handleOpenBrowsers = () => {
    window.electron.ipcRenderer.openPaths(hostA, hostB);
  };

  const updateStatus = (index: number, status: ReviewStatus) => {
    const updatedList = reviewItems.map((item, i) => {
      if (i !== index) {
        return item;
      }

      return {
        ...item,
        status,
      };
    });

    setReviewItems(updatedList);
    window.electron.store.set('reviewItems', updatedList);
    updateReviewIndex(updatedList);
  };

  const handleTablePathClick = (path: string) => {
    setIsReviewing(false);
    openPath(path);
  };

  const setMockData = () => {
    window.electron.store.set('reviewItems', mockData);
    setReviewItems(mockData);
  };

  return (
    <Container py={12}>
      {isReviewing ? (
        <ReviewActions
          path={reviewItems[reviewIndex].path}
          onBack={() => setIsReviewing(false)}
          onBad={() => updateStatus(reviewIndex, 'bad')}
          onGood={() => updateStatus(reviewIndex, 'good')}
          onPostpone={() => updateStatus(reviewIndex, 'postponed')}
        />
      ) : (
        <Group>
          <Button to="/settings" underline="hover" component={Link}>
            Settings
          </Button>
          <Button onClick={handleOpenBrowsers}>Open browser windows</Button>
          <Button onClick={handleOpenReview}>Start review</Button>
        </Group>
      )}

      <Box mt={12}>
        <ReviewPathsTable
          reviewItems={reviewItems}
          onPathClick={handleTablePathClick}
        />
      </Box>
    </Container>
  );
}
