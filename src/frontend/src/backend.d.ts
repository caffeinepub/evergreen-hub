import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PaymentProof {
    id: bigint;
    status: PaymentStatus;
    userId: Principal;
    createdAt: bigint;
    packageId: bigint;
    transactionId: string;
    screenshotBlob: ExternalBlob;
}
export interface AdminStats {
    pendingPayments: bigint;
    totalSales: bigint;
    totalUsers: bigint;
    totalRevenue: bigint;
}
export interface Payment {
    id: bigint;
    status: PaymentStatus;
    userId: Principal;
    createdAt: bigint;
    packageId: bigint;
    transactionId: string;
}
export interface Package {
    id: bigint;
    status: PackageStatus;
    courses: string;
    name: string;
    price: bigint;
}
export interface UserProfile {
    principal: Principal;
    blocked: boolean;
    name: string;
    createdAt: bigint;
    role: Role;
    email: string;
    phone: string;
}
export enum PackageStatus {
    active = "active",
    inactive = "inactive"
}
export enum PaymentStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Role {
    admin = "admin",
    user = "user"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approvePayment(paymentId: bigint): Promise<void>;
    approvePaymentProof(proofId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPackage(name: string, price: bigint, courses: string): Promise<bigint>;
    createPayment(packageId: bigint, transactionId: string): Promise<bigint>;
    deletePackage(packageId: bigint): Promise<void>;
    deleteUser(userId: Principal): Promise<void>;
    getActivePackages(): Promise<Array<Package>>;
    getAdminStats(): Promise<AdminStats>;
    getAllPackages(): Promise<Array<Package>>;
    getAllPaymentProofs(): Promise<Array<PaymentProof>>;
    getAllPayments(): Promise<Array<Payment>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyPaymentProofs(): Promise<Array<PaymentProof>>;
    getMyPayments(): Promise<Array<Payment>>;
    getPaymentProof(proofId: bigint): Promise<PaymentProof | null>;
    getPaymentProofsByStatus(status: PaymentStatus): Promise<Array<PaymentProof>>;
    getPaymentsByStatus(status: PaymentStatus): Promise<Array<Payment>>;
    getPaymentsByUser(userId: Principal): Promise<Array<Payment>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(name: string, email: string, phone: string): Promise<void>;
    rejectPayment(paymentId: bigint): Promise<void>;
    rejectPaymentProof(proofId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitPaymentProof(packageId: bigint, transactionId: string, screenshotBlob: ExternalBlob): Promise<bigint>;
    togglePackageStatus(packageId: bigint): Promise<void>;
    toggleUserBlock(userId: Principal): Promise<void>;
    updatePackage(packageId: bigint, name: string, price: bigint, courses: string): Promise<void>;
    updatePaymentProofStatus(proofId: bigint, status: PaymentStatus): Promise<void>;
    updatePaymentStatus(paymentId: bigint, status: PaymentStatus): Promise<void>;
    updateProfile(name: string, phone: string): Promise<void>;
}
