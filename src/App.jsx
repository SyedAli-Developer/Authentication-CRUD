import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import "./index.css";

// --- SUPABASE CONFIG ---
// Inhe apne Supabase Project Settings -> API se replace karein
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Inline States
  const [addingCardToList, setAddingCardToList] = useState(null); 
  const [newCardText, setNewCardText] = useState("");
  const [editingCard, setEditingCard] = useState({ listId: null, index: null, text: "" });
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  // --- DATABASE OPERATIONS ---

  // 1. Fetch Data (Read)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) console.error("Error fetching:", error);
    else setData(todos || []);
    setLoading(false);
  };

  // 2. Add New List (Create)
  const handleAddList = async () => {
    if (!newListTitle.trim()) return;
    const { error } = await supabase
      .from('todos')
      .insert([{ title: newListTitle, cards: [] }]);
    
    if (!error) {
      setNewListTitle("");
      setIsAddingList(false);
      fetchData(); // Refresh data
    }
  };

  // 3. Delete List (Delete)
  const handleDeleteList = async (listId) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', listId);
    
    if (!error) fetchData();
  };

  // 4. Update Cards (Add/Delete/Edit inside list)
  const updateCardsInDB = async (listId, updatedCards) => {
    const { error } = await supabase
      .from('todos')
      .update({ cards: updatedCards })
      .eq('id', listId);
    
    if (!error) fetchData();
  };

  const handleAddCard = (listId, currentCards) => {
    if (!newCardText.trim()) return;
    const updatedCards = [...currentCards, newCardText];
    updateCardsInDB(listId, updatedCards);
    setNewCardText("");
    setAddingCardToList(null);
  };

  const handleDeleteCard = (listId, currentCards, cardIndex) => {
    const updatedCards = currentCards.filter((_, index) => index !== cardIndex);
    updateCardsInDB(listId, updatedCards);
  };

  const handleSaveEdit = (listId, currentCards, cardIndex) => {
    if (!editingCard.text.trim()) return;
    const updatedCards = [...currentCards];
    updatedCards[cardIndex] = editingCard.text;
    updateCardsInDB(listId, updatedCards);
    setEditingCard({ listId: null, index: null, text: "" });
  };

  if (loading) return <div className="loading">Loading Board...</div>;

  return (
    <div className="trello-wrapper">
      <main className="board-container">
        <header className="board-header">
          <h2>Haxudio Workspace</h2>
        </header>

        <div className="lists-container">
          {data.map((list) => (
            <div key={list.id} className="list-column">
              <div className="list-header">
                <span>{list.title}</span>
                <button className="delete-list-btn" onClick={() => handleDeleteList(list.id)}>&times;</button>
              </div>
              
              <div className="cards-area">
                {list.cards?.map((card, index) => (
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
                          <button onClick={() => handleSaveEdit(list.id, list.cards, index)} className="save-btn">Save</button>
                          <button onClick={() => setEditingCard({ listId: null, index: null, text: "" })}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>{card}</span>
                        <div className="card-actions">
                          <button onClick={() => setEditingCard({ listId: list.id, index, text: card })}>Edit</button>
                          <button onClick={() => handleDeleteCard(list.id, list.cards, index)}>Delete</button>
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
                      <button onClick={() => handleAddCard(list.id, list.cards)} className="save-btn">Add</button>
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