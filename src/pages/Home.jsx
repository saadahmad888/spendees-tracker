
// import { Card, Button, Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// export default function Home() {
//   return (
//     <div className="fade-in">
//       <div className="text-center mb-4">
//         <h2 className="fw-bold brand-gradient">Track your spending & stay on top</h2>
//         <p className="text-muted">Add daily spends, analyze by week/month/year, export, and manage to‑do lists.</p>
//       </div>
//       <Row className="g-4">
//         <Col md={6}>
//           <Card className="border-0 shadow-sm card-hover h-100">
//             <Card.Body className="p-4 d-flex flex-column">
//               <Card.Title className="mb-2">Spendees</Card.Title>
//               <Card.Text className="text-muted flex-grow-1">Add and analyze your expenses with rich filters, categories, and exports.</Card.Text>
//               <div className="d-grid">
//                 <Button as={Link} to="/spendees" variant="primary">Open Spendees</Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card className="border-0 shadow-sm card-hover h-100">
//             <Card.Body className="p-4 d-flex flex-column">
//               <Card.Title className="mb-2">To‑Do Lists</Card.Title>
//               <Card.Text className="text-muted flex-grow-1">Create multiple lists with checkbox tasks and note-only items.</Card.Text>
//               <div className="d-grid">
//                 <Button as={Link} to="/todo" variant="success">Open To‑Do</Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   )
// }



import { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  const STORAGE_KEY = 'spendees_home_instructions_hidden';
  const [showIntro, setShowIntro] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Open modal on first load unless the user opted out
  useEffect(() => {
    const hidden = localStorage.getItem(STORAGE_KEY);
    if (hidden !== 'true') {
      setShowIntro(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    setShowIntro(false);
  };

  const reopen = () => setShowIntro(true);

  return (
    <div className="fade-in">
      <div className="home-page-heading mb-3">
        <div className="text-center flex-grow-1">
          <h2 className="fw-bold brand-gradient">Track your spending &amp; stay on top</h2>
          <p className="text-muted mb-0">
            Add daily spends, analyze by week/month/year, export, and manage to‑do lists.
          </p>
        </div>

        {/* Reopen Instructions button */}
        <div className="ms-3">
          <Button variant="outline-secondary" onClick={reopen}>
            Show Instructions
          </Button>
        </div>
      </div>

      <Row className="g-4">
        <Col md={12} lg={6}>
          <Card className="border-0 shadow-sm card-hover h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title className="mb-2">Spendees</Card.Title>
              <Card.Text className="text-muted flex-grow-1">
                Add and analyze your expenses with rich filters, categories, and exports.
              </Card.Text>
              <div className="d-grid">
                <Button as={Link} to="/spendees" variant="primary">Open Spendees</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={6}>
          <Card className="border-0 shadow-sm card-hover h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title className="mb-2">To‑Do Lists</Card.Title>
              <Card.Text className="text-muted flex-grow-1">
                Create multiple lists with checkbox tasks and note-only items.
              </Card.Text>
              <div className="d-grid">
                <Button as={Link} to="/todo" variant="success">Open To‑Do</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Instructions Modal */}
      <Modal show={showIntro} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Spendees — Quick Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="gy-3">
            <Col md={6}>
              <h6 className="mb-2">1) Add your spends</h6>
              <p className="text-muted mb-0">
                Go to <strong>Spendees</strong> → click <em>Add Entry</em>. Choose date (defaults to today),
                pick categories (spend/amount/status), enter amount, and save.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="mb-2">2) Customize categories</h6>
              <p className="text-muted mb-0">
                Click <em>Customization</em> to add, rename, or delete your own categories &amp; statuses.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="mb-2">3) Filter &amp; export</h6>
              <p className="text-muted mb-0">
                Filter by date range, categories, and status. Export filtered data to Excel or PDF.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="mb-2">4) Analyze your usage</h6>
              <p className="text-muted mb-0">
                See daily/weekly/monthly totals and visualize trends on the chart. Read the narrative summary for insights.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="mb-2">5) To‑Do lists</h6>
              <p className="text-muted mb-0">
                Create multiple lists; add checkbox items or notes to keep your plans on track.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="mb-2">6) Currency &amp; profile</h6>
              <p className="text-muted mb-0">
                Change currency from the navbar. Update your name in <strong>Profile</strong>.
              </p>
            </Col>
          </Row>

          <div className="mt-3">
            <Form.Check
              type="checkbox"
              id="dont-show-again"
              label="Don't show these instructions again"
              checked={dontShowAgain}
              onChange={e => setDontShowAgain(e.target.checked)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Got it</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}