import { useEffect, useMemo, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Badge, MantineColor } from '@mantine/core';
import { sortBy } from 'lodash';
import { ReviewItem, ReviewStatus } from '../types';

const badgeColorByStatus: Record<ReviewStatus, MantineColor> = {
  pending: 'gray',
  good: 'green',
  bad: 'red',
  postponed: 'blue',
};

export interface ReviewPathsTableProps {
  reviewItems: ReviewItem[];
  pageSize?: number;
  onPathClick: (path: string) => void;
}

export function ReviewPathsTable({
  reviewItems,
  pageSize = 10,
  onPathClick,
}: ReviewPathsTableProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ReviewItem>>(
    {
      columnAccessor: 'status',
      direction: 'asc',
    },
  );

  const sortedItems = useMemo(() => {
    const sorted = sortBy(reviewItems, [
      (item: ReviewItem) => {
        const order = { pending: 1, postponed: 2, bad: 3, good: 4 };
        return order[item.status] || 0;
      },
    ]);
    return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
  }, [reviewItems, sortStatus]);

  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(sortedItems.slice(0, pageSize));

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setPageItems(sortedItems.slice(from, to));
  }, [sortedItems, page, pageSize]);

  return (
    <DataTable
      records={pageItems}
      columns={[
        {
          accessor: 'path',
          width: '100%',
          render: ({ path }) => (
            <span onClick={() => onPathClick(path)}>{path}</span>
          ),
        },
        {
          accessor: 'status',
          textAlign: 'right',
          width: 200,
          sortable: true,
          render: ({ status }) => (
            <Badge variant="light" color={badgeColorByStatus[status]}>
              {status}
            </Badge>
          ),
        },
      ]}
      totalRecords={sortedItems.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p: number) => setPage(p)}
      paginationSize="md"
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}
