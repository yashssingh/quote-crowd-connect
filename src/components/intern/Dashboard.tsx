
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock summary data
const mockSummary = {
  totalProducts: 25,
  totalCustomers: 8,
  totalVendors: 12,
  pendingQuotes: 14,
  completedQuotes: 11,
  averageQuoteValue: 1245.87,
};

// Mock product data
const mockProducts = [
  {
    id: "p1",
    name: "Industrial Circuit Board",
    customer: "ABC Electronics",
    category: "Electronics",
    status: "pending",
    date: "2025-04-12",
  },
  {
    id: "p2",
    name: "Ergonomic Office Chair",
    customer: "XYZ Office Solutions",
    category: "Furniture",
    status: "pending",
    date: "2025-04-10",
  },
  {
    id: "p3",
    name: "Custom Metal Bracket",
    customer: "Construction Partners Inc.",
    category: "Custom Parts",
    status: "quoted",
    quoteValue: 1850,
    date: "2025-04-08",
  },
  {
    id: "p4",
    name: "Heavy Duty Work Gloves",
    customer: "Safety First Ltd.",
    category: "Clothing",
    status: "quoted",
    quoteValue: 650,
    date: "2025-04-07",
  },
  {
    id: "p5",
    name: "Industrial Adhesive",
    customer: "Manufacturing Solutions",
    category: "Raw Materials",
    status: "quoted",
    quoteValue: 975.50,
    date: "2025-04-05",
  },
];

// Mock chart data
const dailyActivityData = [
  { name: "Apr 5", products: 2, quotes: 1 },
  { name: "Apr 6", products: 0, quotes: 1 },
  { name: "Apr 7", products: 1, quotes: 2 },
  { name: "Apr 8", products: 3, quotes: 1 },
  { name: "Apr 9", products: 0, quotes: 0 },
  { name: "Apr 10", products: 1, quotes: 0 },
  { name: "Apr 11", products: 0, quotes: 0 },
  { name: "Apr 12", products: 2, quotes: 0 },
];

const categoryDistribution = [
  { name: "Electronics", value: 8 },
  { name: "Furniture", value: 5 },
  { name: "Custom Parts", value: 6 },
  { name: "Raw Materials", value: 3 },
  { name: "Clothing", value: 2 },
  { name: "Other", value: 1 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function InternDashboard() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSummary.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {mockSummary.totalCustomers} customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quote Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSummary.completedQuotes}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {mockSummary.pendingQuotes} pending
              </Badge>
              <p className="text-xs text-muted-foreground">
                {Math.round((mockSummary.completedQuotes / (mockSummary.completedQuotes + mockSummary.pendingQuotes)) * 100)}% completion rate
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Quote Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockSummary.averageQuoteValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {mockSummary.completedQuotes} submitted quotes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts section */}
      <Tabs defaultValue="activity">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="activity">Daily Activity</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Daily Products & Quotes</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyActivityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="products"
                    stroke="#0284c7"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="quotes" stroke="#16a34a" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent products table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Quote Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.customer}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.status === "quoted" ? "default" : "secondary"}
                    >
                      {product.status === "quoted" ? "Quoted" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(product.date)}</TableCell>
                  <TableCell className="text-right">
                    {product.quoteValue
                      ? formatCurrency(product.quoteValue)
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
