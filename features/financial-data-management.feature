Feature: Financial data management
  As a financial analyst
  I want to manage financial data per country
  So that I can see consolidated metrics in USD

  Background:
    Given I am on the "Financial Data" page

  Scenario: View list of financial data with consolidated values
    When I open the application
    Then I should see a table with financial data by country immediately
    And I should see the total amount in USD for each country

  Scenario: See loading state while financial data is being fetched
    When I open the application while financial data is loading
    Then I should see a loading indicator immediately
    And the table should be disabled

  Scenario: See error message when the API returns an error
    Given the API returns an error when fetching financial data
    When I open the application
    Then I should see an error message immediately
    And I should not see outdated financial data

  Scenario: View consolidated summary of all financial data
    When I navigate to the "Summary" section
    Then I should see the total capital saved, capital loaned and profits generated in USD
    And I should see a breakdown by country


