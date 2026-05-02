import React, { useState } from 'react';
import "./index.css";

const initialData = [
  { id: 1, title: 'Today', cards: ['Coding', 'Google Research'] }
];

function App() {
  const [data, setData] = useState(initialData);
  
  // Inline States
  const [addingCardToList, setAddingCardToList] = useState(null); 
  const [newCardText, setNewCardText] = useState("");
  const [editingCard, setEditingCard] = useState({ listId: null, index: null, text: "" });
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  // --- Functions ---

  // Ab ye function direct delete karega bina kisi alert ke
  const handleDeleteList = (listId) => {
    setData(data.filter(list => list.id !== listId));
  };

  const handleAddCard = (listId) => {
    if (!newCardText.trim()) return;
    setData(data.map(list =>
      list.id === listId ? { ...list, cards: [...list.cards, newCardText] } : list
    ));
    setNewCardText("");
    setAddingCardToList(null);
  };

  const handleDeleteCard = (listId, cardIndex) => {
    setData(data.map(list => {
      if (list.id === listId) {
        const newCards = list.cards.filter((_, index) => index !== cardIndex);
        return { ...list, cards: newCards };
      }
      return list;
    }));
  };

  const handleSaveEdit = (listId, cardIndex) => {
    if (!editingCard.text.trim()) return;
    setData(data.map(list => {
      if (list.id === listId) {
        const newCards = [...list.cards];
        newCards[cardIndex] = editingCard.text;
        return { ...list, cards: newCards };
      }
      return list;
    }));
    setEditingCard({ listId: null, index: null, text: "" });
  };

  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    setData([...data, { id: Date.now(), title: newListTitle, cards: [] }]);
    setNewListTitle("");
    setIsAddingList(false);
  };

  return (
    <div className="trello-wrapper">
      <main className="board-container">
        <header className="board-header">
          <h2>My TODOS</h2>
        </header>

        <div className="lists-container">
          {data.map((list) => (
            <div key={list.id} className="list-column">
              {/* Header with Title and Delete Cross */}
              <div className="list-header">
                <span>{list.title}</span>
                <button 
                  className="delete-list-btn" 
                  onClick={() => handleDeleteList(list.id)}
                  title="Delete List"
                >
                  &times;
                </button>
              </div>
              
              <div className="cards-area">
                {list.cards.map((card, index) => (
                  <div key={index} className="card">
                    {editingCard.listId === list.id && editingCard.index === index ? (
                      <div className="edit-input-group">
                        <input 
                          autoFocus
                          className="inline-input"
                          value={editingCard.text}
                          onChange={(e) => setEditingCard({...editingCard, text: e.target.value})}
                        />
                        <div className="card-actions">
                          <button onClick={() => handleSaveEdit(list.id, index)} className="save-btn">Save</button>
                          <button onClick={() => setEditingCard({ listId: null, index: null, text: "" })}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>{card}</span>
                        <div className="card-actions">
                          <button onClick={() => setEditingCard({ listId: list.id, index, text: card })}>Edit</button>
                          <button onClick={() => handleDeleteCard(list.id, index)}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {addingCardToList === list.id ? (
                  <div className="add-card-input-area">
                    <input 
                      autoFocus
                      placeholder="Enter task..."
                      className="inline-input"
                      value={newCardText}
                      onChange={(e) => setNewCardText(e.target.value)}
                    />
                    <div className="card-actions">
                      <button onClick={() => handleAddCard(list.id)} className="save-btn">Add</button>
                      <button onClick={() => setAddingCardToList(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button className="add-card-btn" onClick={() => setAddingCardToList(list.id)}>
                    + Add a card
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="list-column add-list-wrapper">
            {isAddingList ? (
              <div className="add-list-input-area">
                <input 
                  autoFocus
                  placeholder="List title..."
                  className="inline-input"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                />
                <div className="card-actions">
                  <button onClick={handleAddList} className="save-btn">Add List</button>
                  <button onClick={() => setIsAddingList(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="add-list-column" onClick={() => setIsAddingList(true)}>
                + Add another list
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;