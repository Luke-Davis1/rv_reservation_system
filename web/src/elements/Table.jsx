import styled from "styled-components";

export function Table({ data, columns, width, scroll }) {
  if (columns === undefined) return <></>;

  return (
    <StyledTableWrapper $scroll={scroll}>
      <StyledTable width={width}>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data === undefined || !Array.isArray(data) || data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No Data</td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((column) => (
                  <td key={`${column.dataIndex}-${i}`}>
                    {"render" in column
                      ? column.render(row[column.dataIndex], row)
                      : row[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
    </StyledTableWrapper>
  );
}

const StyledTableWrapper = styled.div`
  max-height: ${({ $scroll }) => $scroll ?? "none"};
  overflow-y: auto;
`;

const StyledTable = styled.table`
  width: ${({ width }) => width ?? "100%"};
  border-collapse: collapse;

  thead {
    background-color: #fff;
    color: #252b42;
    position: sticky;
    top: -3px; /* Keeps the header fixed */
    z-index: 1;
  }

  th,
  td {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background-color: #f6f6f6;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  th {
    font-weight: bold;
  }

  td {
    color: #252b42;
    font-weight: 500;
  }
`;
