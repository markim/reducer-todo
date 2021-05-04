import React, { useReducer, useState } from 'react'

interface TodoProps {
  id: number;
  description: string;
  isCompleted: boolean;
};

const initialState = new Array<TodoProps> (
    {
      description: 'Learn about reducers',
      isCompleted: false,
      id: 3892987589
    },
    {
      description: 'Learn about reducers',
      isCompleted: false,
      id: 3892987580
    }
)


// const initialState = { count: 0 } 

// Return JSX that displays the count for the user
// Note the two button elements which allow the user to increase and decrease the count. Each of them contains an onClick event that dispatches the desired action object, with its given type. Each action, when fired, is dispatched to the reducer and the appropriate logic is applied. 
function reducer(state: Array<TodoProps>, action: { type: any, payload: TodoProps }) {
  switch (action.type) {
    case 'save_post':
      return new Array<TodoProps>(...state, action.payload)
    case 'finish_post':
      //const index = state.indexOf(action.payload);
      //console.log(index)
      //state.splice(index, 1)

      const new_state = state.map(x => (x.id === action.payload.id) ? {id: x.id, description: x.description, isCompleted: !x.isCompleted} : x)
      return new Array<TodoProps>(...new_state)
    default:
      return state;
  }
}

function Counter() {
    const [descriptionText, setDescriptionText] = useState("")
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      setDescriptionText(newValue)
    }

    return (
        <>
          <div>
          Todos: 
            {
              state.map(item => {
                  return (
                  <form>
                    <div>{item.id}</div>
                    <div>{item.description}</div>
                    <input type="checkbox" checked={item.isCompleted} onClick={() => dispatch({ type: 'finish_post', payload: {description: item.description, id: item.id, isCompleted: item.isCompleted} })}/>
                  </form>)
                }
              )
            }

          </div>
          <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {event.preventDefault()}}>
            <input type="text" value={descriptionText} onChange={handleInputChange}/>
            <input type="button" onClick={() => {
              dispatch({ type: 'save_post', payload: {description: descriptionText, id: Date.now(), isCompleted: false} })
              setDescriptionText('')
             }} />
          </form>
        </>
    );
}
export default Counter