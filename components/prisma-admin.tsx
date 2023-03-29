
import { PrismaClient } from '@prisma/client'
import { Suspense } from 'react'
import {getDMMF} from '@prisma/internals'
import {parse, stringify, toJSON, fromJSON} from 'flatted';



async function GetTableNames({prisma}: {prisma: PrismaClient}) {
    const tableNames: string[] = []
    Object.keys(prisma).map(async (attr) => {
        if (!attr.startsWith("$") && !attr.startsWith("_")){
            tableNames.push(attr)
        }
    })
    return tableNames
}

async function GetTableRows({prisma, tableName}: {prisma: PrismaClient, tableName: string}) {
    return await prisma[tableName].findMany({take: 10})
}

export default async function PrismaAdmin({prisma}: {prisma: PrismaClient}){
    const tableNames = await GetTableNames({prisma})
    let tables = []
    tableNames.map(tableName=> tables.push(await GetTableRows(tableName)))
    return <>
    {tableNames.map(tableName => <h1>{tableName}</h1>)}
    </>
}

const TableDisplay = ({table, rows}: {table: string, rows: any}) => {
    console.log(rows[0])
    const titleRow = Object.keys(rows[0])
    return (
      <div className="w-full max-w-screen-lg mx-auto mt-6">
        <h1>{table}</h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              {titleRow.map((col, index) => (
                <th key={index} className="px-4 py-2 text-left bg-gray-300 font-semibold uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                {Object.values(row).map((value: any, colIndex: number) => (
                  <td key={colIndex} className="px-4 py-2">
                    {value.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };