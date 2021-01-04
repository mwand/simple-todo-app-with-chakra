import React from "react";
import {
  ChakraProvider,
  Button,
  Heading,
  Stack,
  Table,
  Td,
  Text,
  Tr,
  Th,
  Input,
  FormLabel
} from "@chakra-ui/react";
import customTheme from "./customTheme";
import { useForm } from "react-hook-form";

type Task = { id: number, description: string }

export default function App() {

  const { handleSubmit, errors, register, formState } = useForm();
  const [count, setCount] = React.useState<number>(0)
  const [tasks, setTasks] = React.useState<Task[]>([])

  function onSubmit(values: { name: string }) {
    setCount(count + 1)  // doesn't take effect immediately!
    setTasks(tasks.concat({ id: count, description: values.name }))
  }

  function resetTasks() { setTasks([]) }   // doesn't reset the count

  // renders the task as a table row, with its own delete button
  function renderTask(t: Task) {
    function deleteThisTask() {
      setTasks(tasks.filter(t0 => (t.id !== t0.id)))
    }
    return (
      <Tr>
        <Td width="200px">{t.id}</Td>
        <Td>{t.description}</Td>
        <Td> <Button width="60px" size="md" onClick={deleteThisTask}>Delete</Button> </Td>
      </Tr>
    )
  }

  // make tasks into a table
  function renderTasks() {
    return (
      <div>
        <Text size="md">My Tasks:</Text>
        <Table size="sm" variant="striped" colorScheme="teal">
          <Th><Td>Id</Td><Td>Description</Td></Th>
          {tasks.map(renderTask)}
        </Table>
      </div>
    )

  }


  function renderForm() {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>Enter new task here</FormLabel>
          <Input
            name="name"
            placeholder="new task"
            ref={register}
            width="80%"
          />
          <Button mt={0} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
            Submit
          </Button>
        </form>
    )
  }

  // put the ChakraProvider here so you can specify the theme
  return (
    <ChakraProvider theme={customTheme}>
      <Stack spacing={4} bg="white" p={8} borderRadius="lg">
        <Heading as="h1" size="lg" color="primary.900">
          My ToDo App
        </Heading>
        {renderForm()}
        {renderTasks()}
        <Button width="150px" onClick={resetTasks}>delete all tasks </Button>
      </Stack>
    </ChakraProvider>
  );
}
