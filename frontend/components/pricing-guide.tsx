import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pricingData = [
  { type: 'Document', weight: 'Up to 1 kg', domestic: '$5', international: '$15' },
  { type: 'Small Parcel', weight: '1-5 kg', domestic: '$10', international: '$30' },
  { type: 'Medium Parcel', weight: '5-10 kg', domestic: '$20', international: '$50' },
  { type: 'Large Parcel', weight: '10-20 kg', domestic: '$35', international: '$80' },
]

export function PricingGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Pricing Guide</CardTitle>
        <CardDescription>Standard pricing for different shipment types and destinations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment Type</TableHead>
              <TableHead>Weight Range</TableHead>
              <TableHead>Domestic Price</TableHead>
              <TableHead>International Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>{item.domestic}</TableCell>
                <TableCell>{item.international}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

