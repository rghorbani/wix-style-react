# Sortable

Attaches Drag and Drop behavior to a list of items

| propName   | propType | defaultValue | isRequired | description                                                  |
| ---------- | -------- | ------------ | ---------- | ------------------------------------------------------------ |
| onMove     | func     | -            | -          | callback when item was dropped in a new location             |
| items      | array    | -            | -          | list of items with {id}                                      |
| withHandle | bool     | -            | -          | Whether to render a handle using `connectHandle` (see below) |
| render     | func     | -            | -          | \* A function to render each item in the list                |

*
```js
function render({
  isPreview, // should render the dragged preview of the item (the drag layer)
  isPlaceholder, // should render the placeholder of the item (the shadow in the list for example)
  connectHandle // when 'withHandle' was passed, connect the handle on render with this callback
}) {
  return isPreview ? (
    <div>Preview</div>
  ) : isPlaceholder ? (
    <div>PlaceHolder</div>
  ) : (
    <div>Item {connectHandle(<span>Handle</span>)} </div>
  );
}
```

# SortableList

An Example use of <Sortable/> to render a list of draggable items

Please look at [Draggable](../DragAndDrop/Draggable) to understand how to expand its' use

| propName | propType | defaultValue | isRequired | description                                      |
| -------- | -------- | ------------ | ---------- | ------------------------------------------------ |
| onMove   | func     | -            | -          | callback when item was dropped in a new location |
| items    | array    | -            | -          | list of items with {id, text}                    |


## Important remarks

- `<SortableList/>` is a naive use of <Sortable/>, rendering just text for each item with a predefined style.
- Use `<Sortable/>` if you want to define how the items should look etc.
- `<SortableList>` is already wrapped with `<DragAndDropContextProvider/>` for wip example.
- Please look at [Draggable](../DragAndDrop/Draggable) to understand how to expand its' use
