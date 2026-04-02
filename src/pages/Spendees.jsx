
import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'
import { db } from '../firebase'
import { collection, addDoc, doc, setDoc, getDocs, query, orderBy, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import StatsCard from '../components/StatsCard'
import SimpleChart from '../components/SimpleChart'
import FilterBar from '../components/FilterBar'
import AddSpendModal from '../components/AddSpendModal'
import CustomizeCategories from '../components/CustomizeCategories'
import SpendList from '../components/SpendList'
import ExportButtons from '../components/ExportButtons'
import { filterEntries, groupByDate, getPeriodSums } from '../utils/calculations'
import LoaderOverlay from "../components/LoaderOverlay";
import SpendChart from '../components/SpendChart'
import { useCurrency } from "../contexts/CurrencyContext";


const DEFAULT_CATEGORIES = {
  spend: [
    { id: 'groceries', name: 'Groceries' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'transport', name: 'Transport' }
  ],
  amount: [
    { id: 'personal', name: 'Personal Amount' },
    { id: 'home', name: 'Home Amount' },
    { id: 'office', name: 'Office Amount' }
  ],
  status: [
    { id: 'paid', name: 'Paid' },
    { id: 'unpaid', name: 'Unpaid' },
    { id: 'borrow', name: 'Borrow' },
    { id: 'pending', name: 'Pending' },
    { id: 'paid_card', name: 'Paid with Card' }
  ]
}

export default function Spendees() {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [filters, setFilters] = useState({ from: '', to: '', spendCategories: [], amountCategories: [], statuses: [] })
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [showCat, setShowCat] = useState(false)
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();

  // Load categories
  useEffect(() => {
    const load = async () => {
      const base = collection(db, 'users', user.uid, 'categories')
      const snap = await getDocs(base)
      if (snap.empty) {
        await Promise.all([
          ...DEFAULT_CATEGORIES.spend.map(c => setDoc(doc(base, c.id), { ...c, type: 'spend' })),
          ...DEFAULT_CATEGORIES.amount.map(c => setDoc(doc(base, c.id), { ...c, type: 'amount' })),
          ...DEFAULT_CATEGORIES.status.map(c => setDoc(doc(base, c.id), { ...c, type: 'status' }))
        ])
        setCategories(DEFAULT_CATEGORIES)
      } else {
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setCategories({
          spend: all.filter(x => x.type === 'spend'),
          amount: all.filter(x => x.type === 'amount'),
          status: all.filter(x => x.type === 'status')
        })
      }
    }
    load()
  }, [user.uid])

  // Load entries (basic query; further filter on client)
  useEffect(() => {
    const load = async () => {
      const col = collection(db, 'users', user.uid, 'spendEntries')
      const q = query(col, orderBy('date', 'desc'))
      const snap = await getDocs(q)
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }
    load()
  }, [user.uid])

  const filtered = useMemo(() => filterEntries(entries, filters), [entries, filters])
  const chartData = useMemo(() => groupByDate(filtered), [filtered])
  const sums = useMemo(() => getPeriodSums(filtered), [filtered])

  const onSave = async (payload) => {
    setLoading(true);
    const col = collection(db, 'users', user.uid, 'spendEntries');

    const data = {
      ...payload,
      date: new Date(payload.date).toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (editItem) {
      const ref = doc(db, 'users', user.uid, 'spendEntries', editItem.id);
      await updateDoc(ref, data);
    } else {
      await addDoc(col, data);
    }

    setShowAdd(false);
    setEditItem(null);

    const snap = await getDocs(query(col, orderBy('date', 'desc')));
    setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

    setLoading(false);
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    setLoading(true);

    const ref = doc(db, "users", user.uid, "spendEntries", id);
    await deleteDoc(ref);
    setEntries((prev) => prev.filter((x) => x.id !== id));

    setLoading(false);
  };

  const saveCategories = async (newCats) => {
    setLoading(true);
    const base = collection(db, 'users', user.uid, 'categories');

    const snap = await getDocs(base);
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));

    const toWrite = [
      ...newCats.spend.map((c) => ({ ...c, type: "spend" })),
      ...newCats.amount.map((c) => ({ ...c, type: "amount" })),
      ...newCats.status.map((c) => ({ ...c, type: "status" }))
    ];

    await Promise.all(toWrite.map((c) => setDoc(doc(base, c.id), c)));

    setCategories(newCats);
    setShowCat(false);
    setLoading(false);
  };

  const clearFilters = () => setFilters({ from: '', to: '', spendCategories: [], amountCategories: [], statuses: [] })

  const narrative = useMemo(() => {
    const fromTxt = filters.from ? new Date(filters.from).toLocaleDateString() : 'the beginning';
    const toTxt = filters.to ? new Date(filters.to).toLocaleDateString() : 'today';

    const total = filtered.reduce((s, e) => s + Number(e.amount || 0), 0);
    const count = filtered.length;

    const byStatus = filtered.reduce((acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + Number(e.amount || 0);
      return acc;
    }, {});

    const bySpendCat = filtered.reduce((acc, e) => {
      acc[e.spendCategory] = (acc[e.spendCategory] || 0) + Number(e.amount || 0);
      return acc;
    }, {});

    const topSpend = Object.entries(bySpendCat).sort((a, b) => b[1] - a[1])[0];

    // ✅ FIX: Use selected currency instead of USD
    const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency });

    return (
      `From ${fromTxt} to ${toTxt}, you recorded ${count} entr${count === 1 ? 'y' : 'ies'} totaling ${fmt.format(total)}. ` +
      `${byStatus['Paid'] ? `Paid: ${fmt.format(byStatus['Paid'])}. ` : ''}` +
      `${byStatus['Paid with Card'] ? `Paid with Card: ${fmt.format(byStatus['Paid with Card'])}. ` : ''}` +
      `${byStatus['Unpaid'] ? `Unpaid: ${fmt.format(byStatus['Unpaid'])}. ` : ''}` +
      `${byStatus['Pending'] ? `Pending: ${fmt.format(byStatus['Pending'])}. ` : ''}` +
      `${byStatus['Borrow'] ? `Borrow: ${fmt.format(byStatus['Borrow'])}. ` : ''}` +
      `${topSpend ? `Top spend category: ${topSpend[0]} (${fmt.format(topSpend[1])}).` : ''}`
    );
  }, [filtered, filters, currency]);

  return (
    <div className="fade-in">
      <LoaderOverlay show={loading} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Spendees</h3>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => setShowCat(true)}>Customization</Button>
          <Button onClick={() => { setEditItem(null); setShowAdd(true) }}>Add Entry</Button>
        </div>
      </div>

      <Row className="g-3 mb-3">
        <Col md={6} lg={3}><StatsCard label="Today's Spend" value={sums.daily} variant="primary" /></Col>
        <Col md={6} lg={3}><StatsCard label="This Week" value={sums.weekly} variant="success" /></Col>
        <Col md={6} lg={3}><StatsCard label="This Month" value={sums.monthly} variant="warning" /></Col>
        <Col md={6} lg={3}><StatsCard label="Total" value={sums.total} variant="info" /></Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={12} lg={9}>
          <SpendChart data={chartData} />
        </Col>
        <Col md={12} lg={3} className="d-flex flex-column gap-2">
          <div className="bg-white rounded shadow-sm p-3">
            <div className="fw-semibold mb-2">Quick Summary</div>
            <ul className="mb-0 small text-muted">
              <li>Paid: {filtered.filter(e => e.status.toLowerCase().includes('paid') && !e.status.toLowerCase().includes('card')).reduce((s, e) => s + e.amount, 0).toFixed(2)}</li>
              <li>Paid with Card: {filtered.filter(e => e.status.toLowerCase().includes('card')).reduce((s, e) => s + e.amount, 0).toFixed(2)}</li>
              <li>Unpaid: {filtered.filter(e => e.status.toLowerCase().includes('unpaid')).reduce((s, e) => s + e.amount, 0).toFixed(2)}</li>
              <li>Pending: {filtered.filter(e => e.status.toLowerCase().includes('pending')).reduce((s, e) => s + e.amount, 0).toFixed(2)}</li>
              <li>Borrow: {filtered.filter(e => e.status.toLowerCase().includes('borrow')).reduce((s, e) => s + e.amount, 0).toFixed(2)}</li>
            </ul>
          </div>
          <ExportButtons items={filtered} />
        </Col>
      </Row>

      <div className="mb-3">
        <FilterBar filters={filters} setFilters={setFilters} onApply={() => setFilters({ ...filters })} onClear={clearFilters} categories={categories} />
      </div>

      <Card className="shadow-sm mb-3">
        <Card.Body>
          <div className="fw-semibold mb-1">Narrative</div>
          <p className="mb-0 text-muted">{narrative}</p>
        </Card.Body>
      </Card>

      <SpendList items={filtered} onEdit={(item) => { setEditItem(item); setShowAdd(true) }} onDelete={onDelete} />

      <AddSpendModal show={showAdd} onHide={() => setShowAdd(false)} onSave={onSave} categories={categories} initial={editItem} />
      <CustomizeCategories show={showCat} onHide={() => setShowCat(false)} onChange={saveCategories} categories={categories} />
    </div>
  )
}
