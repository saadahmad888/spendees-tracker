
import { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Form, ListGroup, Badge } from 'react-bootstrap'
import { db } from '../firebase'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'

export default function Todo() {
  const { user } = useAuth()
  const [lists, setLists] = useState([])
  const [activeListId, setActiveListId] = useState('')
  const [newListName, setNewListName] = useState('')
  const [newItem, setNewItem] = useState({ type:'check', text:'' })

  const loadLists = async ()=>{
    const snap = await getDocs(collection(db, 'users', user.uid, 'todoLists'))
    const ls = snap.docs.map(d=> ({ id: d.id, ...d.data() }))
    setLists(ls)
    if (!activeListId && ls[0]?.id) setActiveListId(ls[0].id)
  }

  useEffect(()=>{ loadLists() }, [user.uid])

  const createList = async ()=>{
    if (!newListName.trim()) return
    const ref = await addDoc(collection(db, 'users', user.uid, 'todoLists'), { name: newListName.trim(), createdAt: serverTimestamp() })
    setNewListName('')
    await loadLists(); setActiveListId(ref.id)
  }

  const renameList = async (list)=>{
    const name = prompt('Rename list', list.name)
    if (!name) return
    await updateDoc(doc(db, 'users', user.uid, 'todoLists', list.id), { name })
    await loadLists()
  }

  const deleteList = async (list)=>{
    if (!confirm('Delete this list?')) return
    await deleteDoc(doc(db, 'users', user.uid, 'todoLists', list.id))
    await loadLists()
    setActiveListId('')
  }

  const [items, setItems] = useState([])

  const loadItems = async (listId)=>{
    if (!listId) { setItems([]); return }
    const snap = await getDocs(collection(db, 'users', user.uid, 'todoLists', listId, 'items'))
    setItems(snap.docs.map(d=> ({ id: d.id, ...d.data() })))
  }

  useEffect(()=>{ loadItems(activeListId) }, [activeListId])

  const addItem = async ()=>{
    if (!activeListId || !newItem.text.trim()) return
    await addDoc(collection(db, 'users', user.uid, 'todoLists', activeListId, 'items'), {
      type: newItem.type,
      text: newItem.text.trim(),
      done: false,
      createdAt: serverTimestamp()
    })
    setNewItem({ type:'check', text:'' })
    await loadItems(activeListId)
  }

  const toggleItem = async (item)=>{
    await updateDoc(doc(db, 'users', user.uid, 'todoLists', activeListId, 'items', item.id), { done: !item.done })
    setItems(prev=> prev.map(x=> x.id===item.id? { ...x, done: !x.done } : x))
  }

  const deleteItem = async (item)=>{
    await deleteDoc(doc(db, 'users', user.uid, 'todoLists', activeListId, 'items', item.id))
    setItems(prev=> prev.filter(x=>x.id!==item.id))
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">To‑Do Lists</h3>
      </div>

      <Row className="g-3">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex gap-2 mb-3">
                <Form.Control placeholder="New list name" value={newListName} onChange={e=>setNewListName(e.target.value)} />
                <Button onClick={createList}>Create</Button>
              </div>
              <ListGroup>
                {lists.map(list => (
                  <ListGroup.Item key={list.id} active={list.id===activeListId} action onClick={()=>setActiveListId(list.id)} className="d-flex justify-content-between align-items-center">
                    <span>{list.name}</span>
                    <span className="d-inline-flex gap-1">
                      <Button size="sm" variant="outline-secondary" onClick={(e)=>{ e.stopPropagation(); renameList(list) }}>Rename</Button>
                      <Button size="sm" variant="outline-danger" onClick={(e)=>{ e.stopPropagation(); deleteList(list) }}>Delete</Button>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              {!activeListId && <div className="text-muted">Select a list or create a new one.</div>}
              {activeListId && (
                <>
                  <div className="d-flex gap-2 mb-3">
                    <Form.Select style={{maxWidth:180}} value={newItem.type} onChange={e=>setNewItem(p=>({...p, type:e.target.value}))}>
                      <option value="check">Checkbox item</option>
                      <option value="note">Note-only item</option>
                    </Form.Select>
                    <Form.Control placeholder="Add item..." value={newItem.text} onChange={e=>setNewItem(p=>({...p, text:e.target.value}))} onKeyDown={e=>{ if (e.key==='Enter') addItem() }} />
                    <Button onClick={addItem}>Add</Button>
                  </div>
                  <ListGroup>
                    {items.map(item => (
                      <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          {item.type==='check' && (
                            <Form.Check type="checkbox" checked={!!item.done} onChange={()=>toggleItem(item)} />
                          )}
                          <span className={item.done? 'text-decoration-line-through text-muted':''}>{item.text}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Badge bg="light" text="dark">{item.type}</Badge>
                          <Button size="sm" variant="outline-danger" onClick={()=>deleteItem(item)}>Delete</Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
