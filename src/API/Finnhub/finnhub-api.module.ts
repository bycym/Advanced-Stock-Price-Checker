import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { FinnHubAPIService } from "./finnhub-api.service";

@Module({
  providers: [FinnHubAPIService],
  exports: [FinnHubAPIService]
})
export class FinnHubApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
