
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock product assignments
const mockAssignments = [
  {
    id: "p1",
    name: "Industrial Circuit Board",
    customer: "ABC Electronics",
    description:
      "Custom-designed circuit board for industrial machinery, requires 24V DC input and multiple I/O connections. Dimensions approximately 12cm x 8cm.",
    category: "Electronics",
    quantity: 50,
    images: ["/placeholder.svg"],
    createdAt: "2025-04-12T10:30:00Z",
    quoted: false,
  },
  {
    id: "p2",
    name: "Ergonomic Office Chair",
    customer: "XYZ Office Solutions",
    description:
      "High-quality ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Black color with chrome finish.",
    category: "Furniture",
    quantity: 25,
    images: ["/placeholder.svg"],
    createdAt: "2025-04-10T14:15:00Z",
    quoted: false,
  },
  {
    id: "p3",
    name: "Custom Metal Bracket",
    customer: "Construction Partners Inc.",
    description:
      "L-shaped metal bracket made from stainless steel, 4mm thickness, with pre-drilled mounting holes.",
    category: "Custom Parts",
    quantity: 200,
    images: ["/placeholder.svg"],
    createdAt: "2025-04-08T09:45:00Z",
    quoted: true,
    quoteAmount: 1850,
    quoteNotes: "Price includes shipping and custom packaging.",
  },
];

export default function QuoteList() {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState(mockAssignments);
  const [selectedProduct, setSelectedProduct] = useState<null | typeof mockAssignments[0]>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Handle opening quote dialog
  const openQuoteDialog = (product: typeof mockAssignments[0]) => {
    setSelectedProduct(product);
    // If already quoted, pre-fill the form
    if (product.quoted && product.quoteAmount) {
      setQuoteAmount(product.quoteAmount.toString());
      setQuoteNotes(product.quoteNotes || "");
    } else {
      setQuoteAmount("");
      setQuoteNotes("");
    }
    setDialogOpen(true);
  };

  // Handle quote submission
  const handleSubmitQuote = () => {
    if (!selectedProduct) return;
    if (!quoteAmount || isNaN(Number(quoteAmount)) || Number(quoteAmount) <= 0) {
      toast({
        title: "Invalid Quote Amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    // Update the product with quote information
    const updatedAssignments = assignments.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            quoted: true,
            quoteAmount: Number(quoteAmount),
            quoteNotes: quoteNotes,
          }
        : product
    );

    setAssignments(updatedAssignments);
    setDialogOpen(false);
    
    toast({
      title: "Quote Submitted",
      description: `Your quote for ${selectedProduct.name} has been submitted successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {assignments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground">
              No products have been assigned to you yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Products to Quote</h2>
            <Badge variant="outline">
              {assignments.filter((a) => !a.quoted).length} Pending
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {assignments.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>
                        From {product.customer} · {formatDate(product.createdAt)}
                      </CardDescription>
                    </div>
                    {product.quoted && (
                      <Badge className="bg-green-500">Quoted</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-row space-x-4 mb-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Qty: {product.quantity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {product.quoted && product.quoteAmount && (
                    <div className="mt-2 bg-green-50 p-3 rounded-md">
                      <div className="text-sm text-green-800">
                        <span className="font-medium">Your Quote:</span> $
                        {product.quoteAmount.toLocaleString()}
                      </div>
                      {product.quoteNotes && (
                        <div className="text-xs text-green-700 mt-1">
                          {product.quoteNotes}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => openQuoteDialog(product)}
                    variant={product.quoted ? "outline" : "default"}
                    className="w-full"
                  >
                    {product.quoted ? "Update Quote" : "Submit Quote"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Quote submission dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct?.quoted ? "Update Quote" : "Submit Quote"}
                </DialogTitle>
                <DialogDescription>
                  {selectedProduct?.name} - {selectedProduct?.quantity} units
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="quote-amount">Quote Amount ($)</Label>
                  <Input
                    id="quote-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    placeholder="Enter total quote amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quote-notes">Notes (Optional)</Label>
                  <Textarea
                    id="quote-notes"
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="Add any notes or details about your quote"
                    rows={4}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitQuote}>
                  {selectedProduct?.quoted ? "Update" : "Submit"} Quote
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
