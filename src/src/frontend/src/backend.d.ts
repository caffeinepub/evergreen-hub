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
export interface PhonePeDetails {
    qrCodeBlob: ExternalBlob;
    upiId: string;
}
export interface UserProfile {
    principal: Principal;
    blocked: boolean;
    name: string;
    createdAt: bigint;
    role: Role;
    email: string;
    profilePhotoUrl?: string;
    phone: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface BankDetails {
    branch: string;
    qrCodeBlob: ExternalBlob;
    ifsc: string;
    accountHolderName: string;
    upiHandle: string;
    accountNumber: string;
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
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Referral {
    id: bigint;
    status: ReferralStatus;
    referredUserId: Principal;
    createdAt: bigint;
    referrerId: Principal;
    commissionAmount: bigint;
    commissionType: CommissionType;
    packageId: bigint;
}
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface SiteContent {
    bankDetails: BankDetails;
    phonePeDetails: PhonePeDetails;
    whatsappPhoneNumber: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
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
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface AdminStats {
    pendingPayments: bigint;
    totalSales: bigint;
    totalUsers: bigint;
    totalRevenue: bigint;
}
export interface LandingPage {
    id: bigint;
    title: string;
    content: string;
    visitCount: bigint;
    userId: Principal;
    createdAt: bigint;
    updatedAt: bigint;
    template: string;
}
export interface WithdrawalRequest {
    id: bigint;
    status: WithdrawalRequestStatus;
    userId: Principal;
    createdAt: bigint;
    message: string;
    amount: bigint;
}
export interface Earnings {
    today: bigint;
    lifetime: bigint;
    monthly: bigint;
    weekly: bigint;
}
export interface ContactInterest {
    id: bigint;
    resolved: boolean;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export enum CommissionType {
    active = "active",
    passive = "passive"
}
export enum PackageStatus {
    active = "active",
    inactive = "inactive"
}
export enum ReferralStatus {
    pending = "pending",
    paid = "paid",
    approved = "approved"
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
export enum WithdrawalRequestStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    approvePayment(paymentId: bigint): Promise<void>;
    approvePaymentProof(proofId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignPlatinumPackageByEmail(targetEmail: string): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createLandingPage(title: string, content: string, template: string): Promise<bigint>;
    createPackage(name: string, price: bigint, courses: string): Promise<bigint>;
    createPayment(packageId: bigint, transactionId: string): Promise<bigint>;
    createWithdrawalRequest(amount: bigint, message: string): Promise<bigint>;
    deleteLandingPage(pageId: bigint): Promise<void>;
    deletePackage(packageId: bigint): Promise<void>;
    deleteUser(userId: Principal): Promise<void>;
    getActivePackages(): Promise<Array<Package>>;
    getAdminStats(): Promise<AdminStats>;
    getAllContactInterests(): Promise<Array<ContactInterest>>;
    getAllPackages(): Promise<Array<Package>>;
    getAllPaymentProofs(): Promise<Array<PaymentProof>>;
    getAllPayments(): Promise<Array<Payment>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getAllWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEarnings(userId: Principal): Promise<Earnings>;
    getLandingPage(pageId: bigint): Promise<LandingPage | null>;
    getLandingPageById(pageId: bigint): Promise<LandingPage | null>;
    getLandingPages(userId: Principal): Promise<Array<LandingPage>>;
    getMyPaymentProofs(): Promise<Array<PaymentProof>>;
    getMyPayments(): Promise<Array<Payment>>;
    getPaymentProof(proofId: bigint): Promise<PaymentProof | null>;
    getPaymentProofsByStatus(status: PaymentStatus): Promise<Array<PaymentProof>>;
    getPaymentsByStatus(status: PaymentStatus): Promise<Array<Payment>>;
    getPaymentsByUser(userId: Principal): Promise<Array<Payment>>;
    getPersistentSiteContent(): Promise<SiteContent | null>;
    getReferralsByUser(userId: Principal): Promise<Array<Referral>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTotalCommissions(userId: Principal): Promise<{
        totalPassive: bigint;
        pending: bigint;
        totalActive: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWithdrawalRequests(userId: Principal): Promise<Array<WithdrawalRequest>>;
    incrementLandingPageVisit(pageId: bigint): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    markContactResolved(contactId: bigint): Promise<void>;
    recordPurchase(userId: Principal, amount: bigint): Promise<void>;
    registerUser(name: string, email: string, phone: string, referrerId: Principal | null): Promise<void>;
    rejectPayment(paymentId: bigint): Promise<void>;
    rejectPaymentProof(proofId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setPersistentSiteContent(content: SiteContent): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactInterest(name: string, phone: string, email: string, message: string): Promise<void>;
    submitPaymentProof(packageId: bigint, transactionId: string, screenshotBlob: ExternalBlob): Promise<bigint>;
    togglePackageStatus(packageId: bigint): Promise<void>;
    toggleUserBlock(userId: Principal): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateLandingPage(pageId: bigint, title: string, content: string): Promise<void>;
    updatePackage(packageId: bigint, name: string, price: bigint, courses: string): Promise<void>;
    updatePaymentProofStatus(proofId: bigint, status: PaymentStatus): Promise<void>;
    updatePaymentStatus(paymentId: bigint, status: PaymentStatus): Promise<void>;
    updateProfile(name: string, phone: string): Promise<void>;
    updateRequestStatus(requestId: bigint, status: WithdrawalRequestStatus): Promise<void>;
    uploadProfilePhoto(blob: ExternalBlob): Promise<string>;
}
