export const renderElement = (element) => {
  const Tag = element.elementType;

  return (
    <Tag
      key={element.id}
      id={element.id}
      className={element.classList.join(" ")}
      style={element.styles}
      {...element.props}
    >
      {element.content}

      {element.children.map((child) => renderElement(child))}
    </Tag>
  );
};
