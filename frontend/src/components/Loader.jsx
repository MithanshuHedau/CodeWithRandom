export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
      }}
    >
      <div
        style={{
          height: 36,
          width: 36,
          borderRadius: 999,
          border: "4px solid rgba(255,255,255,0.08)",
          borderTop: "4px solid rgba(124,92,255,1)",
        }}
        className="animate-spin"
      />
    </div>
  );
}
