import React, { useReducer, useState } from 'react'

interface TodoProps {
  id: number;
  description: string;
  isCompleted: boolean;
};

interface Props {
  frontend: string
}

function reducer(state: Array<TodoProps>, action: { type: any, payload: TodoProps }) {
  switch (action.type) {
    case 'save_post':
      const new_add_state = new Array<TodoProps>(...state, action.payload)
      localStorage.setItem('todos', JSON.stringify(new_add_state));
      return new_add_state
    case 'finish_post':
      const new_update_state = state.map(
        x => (x.id === action.payload.id) ?
          { id: x.id, description: x.description, isCompleted: !x.isCompleted }
          : x
      )
      localStorage.setItem('todos', JSON.stringify(new_update_state));
      return new Array<TodoProps>(...new_update_state)
    default:
      return state;
  }
}

const Todos: React.FC<Props> = (props) => {
  const [descriptionText, setDescriptionText] = useState("")
  const todojson = JSON.parse(localStorage.getItem("todos") || "[]")
  const [state, dispatch] = useReducer(reducer, todojson)

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;

    setDescriptionText(newValue)
  }
  //
  // MATERIAL DESIGN ZONE
  //
  if (props.frontend === 'material') {
    return (
      <>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell"></div>
            <div className="mdc-layout-grid__cell">
              Todos ({props.frontend}):
          <ul className="mdc-list" role="group" aria-label="List with checkbox items">
                {
                  state.map(item => {
                    return (
                      <li key={`${item.id}`} className="mdc-list-item" role="checkbox" aria-checked={item.isCompleted}>
                        <span className="mdc-list-item__ripple"></span>
                        <span className="mdc-list-item__graphic">
                          <div className="mdc-checkbox">
                            <input type="checkbox"
                              className="mdc-checkbox__native-control"
                              id={`demo-list-checkbox-item-${item.id}`}
                              defaultChecked={item.isCompleted}
                              onClick={() => dispatch({ type: 'finish_post', payload: { description: item.description, id: item.id, isCompleted: item.isCompleted } })}
                            />
                            <div className="mdc-checkbox__background">
                              <svg className="mdc-checkbox__checkmark"
                                viewBox="0 0 24 24">
                                <path className="mdc-checkbox__checkmark-path"
                                  fill="none"
                                  d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                              </svg>
                              <div className="mdc-checkbox__mixedmark"></div>
                            </div>
                          </div>
                        </span>
                        <label className="mdc-list-item__text" htmlFor={`demo-list-checkbox-item-${item.id}`}>{item.description}</label>
                      </li>
                    )


                    // <form>
                    //   <div>{item.id}</div>
                    //   <div>{item.description}</div>
                    //   <input type="checkbox" checked={item.isCompleted} onClick={() => dispatch({ type: 'finish_post', payload: {description: item.description, id: item.id, isCompleted: item.isCompleted} })}/>
                    // </form>)
                  }
                  )
                }
              </ul>
              <div style={{ width: "100%" }}>
                <label className="mdc-text-field mdc-text-field--filled">
                  <span className="mdc-text-field__ripple"></span>
                  <input value={descriptionText} onChange={handleInputChange} className="mdc-text-field__input" type="text" aria-labelledby="my-label-id" />
                  <span className="mdc-line-ripple"></span>
                </label>
                <div className="mdc-touch-target-wrapper">
                  <button onClick={() => {
                    dispatch({ type: 'save_post', payload: { description: descriptionText, id: Date.now(), isCompleted: false } })
                    setDescriptionText('')
                  }}
                    className="mdc-button mdc-button--touch">
                    <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__label">Add</span>
                    <span className="mdc-button__touch"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mdc-layout-grid__cell"></div>
          </div>
        </div>
      </>
    );
  }
  //
  // BOOTSTRAP DESIGN ZONE
  //
  else if (props.frontend === "bootstrap") {
    return <>
      <div className="container">
        <div className="list-group">
          {
            state.map(item => {
              return (
                <label className="list-group-item">
                  <input 
                  onClick={() => dispatch({ type: 'finish_post', payload: { description: item.description, id: item.id, isCompleted: item.isCompleted } })}
                  className="form-check-input me-1" checked={item.isCompleted} type="checkbox" value="" />
            {item.description}
                </label>)
            })
          }
        </div>
      </div>

    </>
  }
  else {
    return <></>
  }

}
export default Todos