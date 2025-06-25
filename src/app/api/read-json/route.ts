import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
 try {
const { searchParams } = new URL(request.url);
console.log('///// searchParams:', searchParams);
const shopId = searchParams.get('shopId');
const userType = searchParams.get('userType');

console.log('///// shopId:', shopId);
console.log('///// userType:', userType);


 if (!shopId) {
      return NextResponse.json(
        { message: 'Shop ID parameter is missing' },
        { status: 400 }
      );
    }
    if (!userType) { 
      return NextResponse.json(
        { message: 'User Type parameter is missing' },
        { status: 400 }
      );
    }

     const jsonFilePath = path.join(process.cwd(), 'public', 'bonus.json');
     const fileContent = await fs.readFile(jsonFilePath, 'utf-8');

     const data: []= JSON.parse(fileContent);
     const filteredData = data.filter(item =>item['Site Id']=== shopId && item['Type']=== userType);

    return NextResponse.json(filteredData);

 } catch (error) {
    return NextResponse.json(
      { message: 'Failed to load data from JSON',error},
      { status: 500 }
    );
 }}