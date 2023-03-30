import { prisma } from '../lib/db'
import { use } from 'react'

export default async function PrismaAdmin() {
  const tableNames = Object.keys(prisma).filter(attr => {
    if (!attr.startsWith("$") && !attr.startsWith("_")) {
      return attr
    }
  })
  {/* @ts-expect-error Server Component */}
  return (
    <>
      <h1>Prisma Admin</h1>
      {tableNames.map((tableName, index) => (
        <PrismaTable key={index} tableName={tableName} />
        ))}
    </>
  );
}

async function PrismaTable({tableName}){
  const rows = await prisma[tableName].findMany({take: 10})
  const columnNames = rows.length > 0 ? Object.keys(rows[0]) : [];
  return (
    <div>
      <h2>{tableName}</h2>
      <table>
        <thead>
          <tr>
            {columnNames.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((columnName, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {row[columnName] != null ? row[columnName].toString() : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
