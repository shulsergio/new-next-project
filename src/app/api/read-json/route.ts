import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
 try {

     const jsonFilePath = path.join(process.cwd(), 'public', 'bonus.json');
     const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
     const data = JSON.parse(fileContent);
    return NextResponse.json(data);

 } catch (error) {
    return NextResponse.json(
      { message: 'Failed to load data from JSON',error},
      { status: 500 }
    );
 }}