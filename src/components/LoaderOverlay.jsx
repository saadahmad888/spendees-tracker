export default function LoaderOverlay({ show }) {
    if (!show) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,255,255,0.6)',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="spinner-border text-primary" />
        </div>
    );
}