import React, { useState } from 'react';
import { useGetAllContactInterests, useMarkContactResolved } from '../../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, Search, Mail, Phone, MessageSquare, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactInquiries() {
  const { data: inquiries = [], isLoading } = useGetAllContactInterests();
  const markResolved = useMarkContactResolved();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search) ||
      inq.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'resolved' && inq.resolved) ||
      (filter === 'unresolved' && !inq.resolved);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (ts: bigint) => {
    return new Date(Number(ts) / 1_000_000).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unresolvedCount = inquiries.filter((i) => !i.resolved).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Inquiries</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all contact form submissions
          </p>
        </div>
        {unresolvedCount > 0 && (
          <Badge className="bg-red-500 text-white text-sm px-3 py-1">
            {unresolvedCount} Unresolved
          </Badge>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, phone, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'unresolved', 'resolved'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MessageSquare className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-lg font-medium">No inquiries found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-700/50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Message</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inq) => (
                <TableRow
                  key={inq.id.toString()}
                  className={!inq.resolved ? 'bg-yellow-50/50 dark:bg-yellow-900/10 font-medium' : ''}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {!inq.resolved && (
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      )}
                      <span className={!inq.resolved ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}>
                        {inq.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="h-3 w-3" />
                        <span>{inq.phone}</span>
                      </div>
                      {inq.email && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-3 w-3" />
                          <span>{inq.email}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate" title={inq.message}>
                      {inq.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(inq.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {inq.resolved ? (
                      <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 dark:bg-green-900/20">
                        Resolved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50 dark:bg-red-900/20">
                        Unresolved
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!inq.resolved && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                        disabled={markResolved.isPending}
                        onClick={() => markResolved.mutate(inq.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Resolved
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <p className="text-sm text-gray-400 text-right">
        Showing {filtered.length} of {inquiries.length} inquiries
      </p>
    </div>
  );
}
