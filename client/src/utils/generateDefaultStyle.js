export const defaultStyle = (elementType) => {
  const base = {
    display: "block",
    position: "relative"
  };

  const presets = {
    div: {
      width: 300,
      height: 150,
      backgroundColor: "#f5f5f5",
      padding: 20,
      borderRadius: 8,
    },

    section: {
      width: "100%",
      padding: 40,
      backgroundColor: "#fafafa",
    },

    p: {
      fontSize: 16,
      color: "#111",
      lineHeight: 1.5,
      marginBottom: 10,
    },

    h1: {
      fontSize: 32,
      fontWeight: "700",
      marginBottom: 15,
      color: "#111",
    },

    h2: {
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 12,
      color: "#222",
    },

    button: {
      backgroundColor: "#2563eb",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: 8,
      fontSize: 16,
      fontWeight: "500",
      cursor: "pointer",
      display: "inline-block",
    },

    img: {
      width: 200,
      height: "auto",
      objectFit: "cover",
      borderRadius: 6,
    },

    span: {
      fontSize: 14,
      color: "#111",
      display: "inline-block",
    }
  };

  return { ...base, ...(presets[elementType] || {}) };
};
