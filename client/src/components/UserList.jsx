import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";

const UserList = ({ users, onView, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(null);

  const handleDelete = async (userId) => {
    setIsDeleting(userId);
    await onDelete(userId);
    setIsDeleting(null);
  };

  return (
    <Box py={6}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => onView(user.id)}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => onEdit(user.id)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  isLoading={isDeleting === user.id}
                  onClick={() => handleDelete(user.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {users.length === 0 && (
        <Text mt={4}>There are no users to display.</Text>
      )}
    </Box>
  );
};

export default UserList;

