import {State} from 'slate';
import htmlSerializer from './htmlSerializer';

describe('HTML serializer', () => {
  it('should correctly deserialize HTML string', () => {
    const text = `<p>Hello<strong>bold text</strong><em>italic<u>and underlined</u></em></p><ol><li>one</li><li>two</li></ol><p><a href="http://localhost">Link to localhost</a></p>`;
    const expected = {
      kind: 'state',
      document: {
        kind: 'document',
        data: {},
        nodes: [
          {
            kind: 'block',
            type: 'paragraph',
            data: {},
            isVoid: false,
            nodes: [
              {
                kind: 'text',
                leaves: [
                  {
                    kind: 'leaf',
                    text: 'Hello',
                    marks: []
                  },
                  {
                    kind: 'leaf',
                    text: 'bold text',
                    marks: [
                      {
                        data: {},
                        kind: 'mark',
                        type: 'bold'
                      }
                    ]
                  },
                  {
                    kind: 'leaf',
                    text: 'italic',
                    marks: [
                      {
                        data: {},
                        kind: 'mark',
                        type: 'italic'
                      }
                    ]
                  },
                  {
                    kind: 'leaf',
                    text: 'and underlined',
                    marks: [
                      {
                        data: {},
                        kind: 'mark',
                        type: 'underline'
                      },
                      {
                        data: {},
                        kind: 'mark',
                        type: 'italic'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            kind: 'block',
            type: 'ordered-list',
            data: {},
            isVoid: false,
            nodes: [
              {
                kind: 'block',
                type: 'list-item',
                data: {},
                isVoid: false,
                nodes: [
                  {
                    kind: 'text',
                    leaves: [
                      {
                        kind: 'leaf',
                        text: 'one',
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                kind: 'block',
                type: 'list-item',
                data: {},
                isVoid: false,
                nodes: [
                  {
                    kind: 'text',
                    leaves: [
                      {
                        kind: 'leaf',
                        text: 'two',
                        marks: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            kind: 'block',
            type: 'paragraph',
            data: {},
            isVoid: false,
            nodes: [
              {
                kind: 'text',
                leaves: [
                  {
                    kind: 'leaf',
                    text: '',
                    marks: []
                  }
                ]
              },
              {
                kind: 'inline',
                type: 'link',
                data: {
                  href: 'http://localhost'
                },
                isVoid: false,
                nodes: [
                  {
                    kind: 'text',
                    leaves: [
                      {
                        kind: 'leaf',
                        text: 'Link to localhost',
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                kind: 'text',
                leaves: [
                  {
                    kind: 'leaf',
                    text: '',
                    marks: []
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    const deserialized = htmlSerializer.deserialize(text);
    expect(State.fromJSON(deserialized).toJSON()).toEqual(expected);
  });

  it('should correctly serialize slate object to HTML string', () => {
    const expected = `<ul><li>one</li><li>two</li></ul><p>Text here<strong>bold text</strong><em>italic</em><em><u>and underlined</u></em><a rel="noopener noreferrer" target="_blank" href="http://localhost">Link</a></p>`;
    const state = {
      object: 'value',
      document: {
        nodes: [
          {
            kind: 'block',
            type: 'unordered-list',
            data: {},
            nodes: [
              {
                kind: 'block',
                type: 'list-item',
                data: {},
                nodes: [
                  {
                    kind: 'text',
                    leaves: [
                      {
                        kind: 'leaf',
                        text: 'one',
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                kind: 'block',
                type: 'list-item',
                nodes: [
                  {
                    kind: 'text',
                    leaves: [
                      {
                        kind: 'leaf',
                        text: 'two',
                        marks: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [
              {
                kind: 'text',
                leaves: [
                  {
                    kind: 'leaf',
                    text: 'Text here',
                    marks: []
                  },
                  {
                    kind: 'leaf',
                    text: 'bold text',
                    marks: [
                      {
                        kind: 'mark',
                        type: 'bold',
                        data: {}
                      }
                    ]
                  },
                  {
                    kind: 'leaf',
                    text: 'italic',
                    marks: [
                      {
                        kind: 'mark',
                        type: 'italic',
                        data: {}
                      }
                    ]
                  },
                  {
                    kind: 'leaf',
                    text: 'and underlined',
                    marks: [
                      {
                        kind: 'mark',
                        type: 'underline',
                        data: {}
                      },
                      {
                        kind: 'mark',
                        type: 'italic',
                        data: {}
                      }
                    ]
                  }
                ]
              },
              {
                kind: 'inline',
                type: 'link',
                data: {
                  href: 'http://localhost'
                },
                nodes: [
                  {
                    kind: 'text',
                    leaves: [
                      {
                        kind: 'leaf',
                        text: 'Link',
                        marks: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    const serialized = State.fromJSON(state);
    expect(htmlSerializer.serialize(serialized)).toEqual(expected);
  });
});
