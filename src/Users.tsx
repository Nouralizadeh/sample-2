
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { UserType, fetchUsers } from './UserContext';
import { Text, Box, Title, Modal, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import User from './User';



export default function Users() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, page, perPage, loading } = fetchUsers()
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(undefined)

  const defaultProfileAvatar = "../public/profile.jpg"
//************************************************************************* */
//**************************Columns definition***************************** */
//************************************************************************* */
const columns = useMemo<MRT_ColumnDef<UserType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 200,
        filterVariant: 'range-slider',
      },
      {
        accessorFn: (row) => row.name,
        id: 'name',
        header: 'Name',
        size: 250,
        filterVariant: 'autocomplete',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar ?? defaultProfileAvatar}
              style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'email',
        enableClickToCopy: true,
        header: 'Email',
        size: 300,
        Cell: ({ cell, row }) => row.original.email ? cell.getValue<string>() : "email@aaaa.com"
        ,
      },
      {
        accessorKey: 'year',
        header: 'Year',
        size: 350,
      },
      {
        accessorKey: 'color',
        header: 'Color',
        size: 200,
        filterVariant: 'range-slider',
        Cell: ({ cell }) => (
          <Box
            sx={() => ({
              backgroundColor: cell.getValue<string>(),
              borderRadius: '4px',
              color: '#fff',
              maxWidth: '9ch',
              padding: '4px',
            })}
          >
            {cell.getValue<number>()}
          </Box>
        ),
      },
      {
        accessorKey: 'pantone_value',
        header: 'Pantone_value',
        size: 350,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data : [],
    enableColumnOrdering: true,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setCurrentUser(row.original);
        open()
      },
      sx: {
        cursor: 'pointer',
      },
    }),
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    initialState: { pagination: { pageSize: perPage == 0 ? 6 : perPage, pageIndex: page - 1, }, isLoading: loading },
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search Users',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
        }}
      >
        <img
          alt="avatar"
          height={200}
          src={row.original.avatar ?? defaultProfileAvatar}
          style={{ borderRadius: '50%' }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Title>{row.original.name}</Title>
          <Text>&quot;{row.original.email ?? "email@aaaa.com"}&quot;</Text>
        </Box>
      </Box>
    ),
  });
  //************************************************************************* */
  //************************************************************************* */

  return (
    <div>
      <LoadingOverlay visible={loading} loaderProps={{ children: 'Loading...' }} />
      <MantineReactTable table={table} />
      <Modal opened={opened} onClose={close} title="User Info" centered>
        <User user={currentUser} />
      </Modal>
    </div>);
}
