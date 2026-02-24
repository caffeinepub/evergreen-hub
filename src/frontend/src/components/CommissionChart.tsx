import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Award } from 'lucide-react';

const commissionData = [
  { package: 'E-LITE', price: 699, activeIncome: 470, passiveIncome: 50 },
  { package: 'SILVER', price: 1499, activeIncome: 1000, passiveIncome: 100 },
  { package: 'GOLD', price: 2999, activeIncome: 2000, passiveIncome: 250 },
  { package: 'DIAMOND', price: 4999, activeIncome: 3400, passiveIncome: 400 },
  { package: 'PLATINUM', price: 9999, activeIncome: 6700, passiveIncome: 800 },
  { package: 'ULTRA PRO', price: 14999, activeIncome: 10000, passiveIncome: 1100 },
];

export default function CommissionChart() {
  return (
    <Card className="bg-white dark:bg-slate-800 border-2 border-emerald-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-500" />
          Commission Chart
        </CardTitle>
        <CardDescription>Earn commissions when you refer users to purchase packages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Package</TableHead>
                <TableHead className="font-semibold text-right">Price</TableHead>
                <TableHead className="font-semibold text-right">
                  <span className="flex items-center justify-end gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Active Income
                  </span>
                </TableHead>
                <TableHead className="font-semibold text-right">
                  <span className="flex items-center justify-end gap-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    Passive Income
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionData.map((item) => (
                <TableRow key={item.package}>
                  <TableCell className="font-medium">{item.package}</TableCell>
                  <TableCell className="text-right">₹{item.price}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ₹{item.activeIncome}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                      ₹{item.passiveIncome}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-800 dark:text-emerald-200">
            <strong>Active Income:</strong> Earned immediately when your referral purchases a package
          </p>
          <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1">
            <strong>Passive Income:</strong> Additional earnings from your referral network
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
