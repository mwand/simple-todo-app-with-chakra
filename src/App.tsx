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
  Thead,
  Input,
  FormLabel
} from "@chakra-ui/react";

// make it at least a little pretty
import customTheme from "./customTheme";

// react-hook-form seems easier than Chakra's Form
// using the 'import * as' to remind the reader which version
// of useForm() we're using.

// import { useForm } from "react-hook-form";
import * as ReactHookForm from 'react-hook-form'

// datatype for an individual task
type Task = { id: number, description: string }

// Our component....
export default function ToDoApp() {

  // ReactHookForm.useForm exports a bunch of stuff.
  // These are just the pieces we seem to need.
  const { handleSubmit, formState, reset, register } = ReactHookForm.useForm();

  // The component's state is split across two variables.
  // React.useState exports a getter and a setter.
  // Note how the type and initial value are specified.
  const [count, setCount] = React.useState<number>(0)
  const [tasks, setTasks] = React.useState<Task[]>([])

  // Having the second argument as an empty array calls useEffect only once, 
  // making it similar to componentDidMount.
  React.useEffect(() => {
    document.title = "My Todo App Web page"
  }, []);

  // the actions are defined as local functions in the component

  // on submit, reset the textbox, increment the counter,
  // and add the new task to 'tasks'
  function onSubmit(values: { name: string }) {
    reset()    // this has to go first; I don't know why.
    setCount(count + 1)  // doesn't take til next render.
    setTasks(tasks.concat({ id: count, description: values.name }))
  }

  // empties the task list, but doesn't reset the counter
  function resetTasks() { setTasks([]) }   

  // renders the task as an html table row, with its own delete button
  // local functions For The Win
  // Note the use of the Chakra tags, like Td, instead of the native html
  // tags.  This allows Chakra to be clever with adapting to screen sizes 
  // and also with colors.
  function renderTask(t: Task) {
    function deleteThisTask() {
      setTasks(tasks.filter(t0 => (t.id !== t0.id)))
    }
    return (
      <Tr>
        <Td>{t.description}</Td>
        <Td>{t.id}</Td>
        <Td> <Button width="60px" size="md" onClick={deleteThisTask}>Delete</Button> </Td>
      </Tr>
    )
  }

  // renders the tasks as an html table\
  // note the call to tasks.map to render the rows of the table
  function renderTasks() {
    return (
      <div>
        <Text size="md">My Tasks:</Text>
        <Table size="sm" variant="striped" colorScheme="teal">
          <Thead>
            <Th width="400px">Description</Th>
            <Th>Id</Th>
          </Thead>
          {tasks.map(renderTask)}
        </Table>
      </div>
    )

  }

  // renders the form itself. 
  // 'name' is the tag under which the form data will appear in the output data
  // (see 'name' in the code of onSubmit)
  // placeholder is the small text that appears in  the blank form
  // I don't fully understand the 'ref' tag, but it seems to be necessary :(
  // the Submit button appears a couple of pixels lower than the Input box;
  // I don't understand why.
  function renderForm() {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>Enter new task here</FormLabel>
          <Input
            name="name"
            placeholder="new task"
            ref = {register}
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
