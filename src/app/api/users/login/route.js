import {connectDB} from '@/db/index.js';
import { User } from '@/models/user.model';
import {NextRequest, NextResponse} from 'next/server';



export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        if(!email || !password) {
            return NextResponse.json({error:"Both fields are required", status:400});
        }

        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error:"User not found", status:404});
        }

        const isPasswordCurrect = await user.comparePassword(password);
        if(!isPasswordCurrect) {
            return NextResponse.json({error:"Password is incorrect", status:400});
        }

        const accessToken = await user.generateAccessToken();
        const loginUser = await User.findById(user._id).select('-password');
        const response = NextResponse.json({message:"Login successfull", user:loginUser, token:accessToken, status:200});
        return response;
    } catch (error) {
        return NextResponse.json({error:error.message, status:500});
    }
}