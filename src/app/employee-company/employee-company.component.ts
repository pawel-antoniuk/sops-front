import { Component, OnInit, EventEmitter } from "@angular/core";
import { Company } from "../models/company";
import { DataService, ModelState } from "../data.service";
import { ProfileDetails } from "../models/profile-details";
import { ErrorService } from "../error.service";
import { Product } from "../models/product";

@Component({
  selector: "app-employee-company",
  templateUrl: "./employee-company.component.html",
  styleUrls: ["./employee-company.component.css"]
})
export class EmployeeCompanyComponent implements OnInit {
  company: Company = new Company();
  companyProducts: Product[] = [];
  profileDetails: ProfileDetails = new ProfileDetails();
  selectedProduct: Product = new Product();
  newProduct: Product;
  submitEmitter = new EventEmitter();
  modelState = new ModelState();
  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.newProduct = new Product();
    this.getCompany();
  }

  getCompany(): void {
    this.dataService
      .getObjectByUrl(ProfileDetails, "/api/User/Current")
      .subscribe(result => {
        this.errorService.showError(result);
        this.profileDetails = result.object;
        this.dataService
          .getObjectByUrl(
            Company,
            `/api/Company/Profile?userid=${this.profileDetails.id}`
          )
          .subscribe(result => {
            this.errorService.showError(result);
            this.company = result.object;
            this.companyProducts = this.company.products;
            this.newProduct = new Product();
            this.newProduct.companyId = this.company.id;
            console.log(this.newProduct.companyId);
          });
      });
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  delete(product: Product): void {
    this.companyProducts = this.companyProducts.filter(p => p !== product);
    this.dataService.deleteObject(product).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    /*this.dataService.addproduct({name} as Product)
      .subscribe(product => {
        this.products.push(product);
      });*/
  }

  onProductAddClick(): void {
    this.submitEmitter.emit();
    this.dataService.postObject(this.newProduct).subscribe(result => {
      if (result.object || !result.modelState.isOk()) {
        this.modelState.update(result.modelState);
        this.getCompany();
      } else {
        this.errorService.showError(result);
      }
    });
  }
}