
// import { useEffect, useState } from 'react'
// import { Modal, Button, Row, Col, Form, ListGroup, InputGroup } from 'react-bootstrap'
// import toast from "react-hot-toast";

// export default function CustomizeCategories({ show, onHide, onChange, categories }) {
//   const [local, setLocal] = useState({ spend: [], amount: [], status: [] })
//   const [hasChanges, setHasChanges] = useState(false);
//   const [wasSaved, setWasSaved] = useState(false);

//   useEffect(() => { setLocal(categories) }, [categories, show])

//   useEffect(() => {
//     return () => {
//       if (!wasSaved && hasChanges) {
//         toast.error("Customization changes were not saved!");
//       }
//     };
//   }, [wasSaved, hasChanges]);

//   const handleAdd = (type) => {
//     setHasChanges(true);
//     const name = prompt('Enter new name')
//     if (!name) return
//     setLocal(prev => ({ ...prev, [type]: [...prev[type], { id: crypto.randomUUID(), name }] }))
//   }

//   const handleRename = (type, id) => {
//     setHasChanges(true);
//     const item = local[type].find(x => x.id === id)
//     const name = prompt('Rename to', item?.name)
//     if (!name) return
//     setLocal(prev => ({ ...prev, [type]: prev[type].map(x => x.id === id ? { ...x, name } : x) }))
//   }

//   const handleDelete = (type, id) => {
//     setHasChanges(true);
//     if (!confirm('Delete this item?')) return
//     setLocal(prev => ({ ...prev, [type]: prev[type].filter(x => x.id !== id) }))
//   }

//   const save = () => onChange(local)

//   const Section = ({ type, title }) => (
//     <Col md={4}>
//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <h6 className="mb-0">{title}</h6>
//         <Button size="sm" variant="outline-primary" onClick={() => handleAdd(type)}>Add</Button>
//       </div>
//       <ListGroup>
//         {local[type].map(item => (
//           <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
//             <span>{item.name}</span>
//             <div className="btn-group btn-group-sm">
//               <Button variant="outline-secondary" onClick={() => handleRename(type, item.id)}>Edit</Button>
//               <Button variant="outline-danger" onClick={() => handleDelete(type, item.id)}>Delete</Button>
//             </div>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Col>
//   )

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton><Modal.Title>Customize Categories</Modal.Title></Modal.Header>
//       <Modal.Body>
//         <Row className="g-3">
//           <Section type="spend" title="Spend Categories" />
//           <Section type="amount" title="Amount Categories" />
//           <Section type="status" title="Amount Statuses" />
//         </Row>
//         <div className="text-muted small mt-3">Changes apply for your account only.</div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>Close</Button>
//         <Button onClick={save}>Save Changes</Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }


import { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, ListGroup } from 'react-bootstrap'
import toast from "react-hot-toast";

export default function CustomizeCategories({ show, onHide, onChange, categories }) {
  const [local, setLocal] = useState({ spend: [], amount: [], status: [] })
  const [hasChanges, setHasChanges] = useState(false);
  const [wasSaved, setWasSaved] = useState(false);

  // Load categories when modal opens
  useEffect(() => {
    if (show) {
      setLocal(categories);
      setHasChanges(false);
      setWasSaved(false);
    }
  }, [show, categories]);

  // Handle closing of modal
  const handleClose = () => {
    if (!wasSaved && hasChanges) {
      toast.error("Customization changes were not saved!");
    }
    onHide(); // always close modal
  };

  const handleAdd = (type) => {
    const name = prompt('Enter new name');
    if (!name) return;
    setHasChanges(true);
    setLocal(prev => ({
      ...prev,
      [type]: [...prev[type], { id: crypto.randomUUID(), name }]
    }));
  };

  const handleRename = (type, id) => {
    const item = local[type].find(x => x.id === id);
    const name = prompt('Rename to', item?.name);
    if (!name) return;
    setHasChanges(true);
    setLocal(prev => ({
      ...prev,
      [type]: prev[type].map(x => x.id === id ? { ...x, name } : x)
    }));
  };

  const handleDelete = (type, id) => {
    if (!confirm('Delete this item?')) return;
    setHasChanges(true);
    setLocal(prev => ({
      ...prev,
      [type]: prev[type].filter(x => x.id !== id)
    }));
  };

  const save = () => {
    setWasSaved(true);
    setHasChanges(false);
    onChange(local);
    toast.success("Categories updated!");
  };

  const Section = ({ type, title }) => (
    <Col md={4}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">{title}</h6>
        <Button size="sm" variant="outline-primary" onClick={() => handleAdd(type)}>
          Add
        </Button>
      </div>

      <ListGroup>
        {local[type].map(item => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <span>{item.name}</span>
            <div className="btn-group btn-group-sm">
              <Button variant="outline-secondary" onClick={() => handleRename(type, item.id)}>Edit</Button>
              <Button variant="outline-danger" onClick={() => handleDelete(type, item.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Customize Categories</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="g-3">
          <Section type="spend" title="Spend Categories" />
          <Section type="amount" title="Amount Categories" />
          <Section type="status" title="Amount Statuses" />
        </Row>
        <div className="text-muted small mt-3">
          Changes apply for your account only.
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button onClick={save}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}