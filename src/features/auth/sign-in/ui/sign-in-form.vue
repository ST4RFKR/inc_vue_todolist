<script setup lang="ts">
import { computed, ref } from "vue";
import { useField, useForm } from "vee-validate";
import { object, string } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/components/ui";
import { cn } from "@/shared/lib/style";
import { useLogin } from "../model/useLogin";

const { handleSubmit, isSubmitting, submitCount } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string()
        .trim()
        .min(3, "Email is required")
        .email("Email is invalid"),
      password: string().min(3, "Password is required"),
    }),
  ),
  initialValues: {
    email: "",
    password: "",
  },
});

const { login } = useLogin();

const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
  handleBlur: handleEmailBlur,
} = useField<string>("email");
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
  handleBlur: handlePasswordBlur,
} = useField<string>("password");

const submitError = ref<string | null>(null);

const shouldShowEmailError = computed(
  () =>
    Boolean(emailError.value) && (emailMeta.touched || submitCount.value > 0),
);
const shouldShowPasswordError = computed(
  () =>
    Boolean(passwordError.value) &&
    (passwordMeta.touched || submitCount.value > 0),
);

const onSubmit = handleSubmit(async (_values) => {
  submitError.value = null;

  try {
    login({
      email: email.value,
      password: password.value,
    });
  } catch {
    submitError.value = "Unable to sign in. Please try again.";
  }
});
</script>

<template>
  <div :class="cn('flex flex-col gap-6')">
    <Card class="w-111 gap-4">
      <CardHeader>
        <CardTitle> Sign in </CardTitle>
        <CardDescription>
          <Card class="flex flex-col gap-2 border p-4 rounded mt-4">
            <p>Free email: <b>free@samuraijs.com</b></p>
            <p>Free password: <b>free</b></p>
          </Card>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form novalidate @submit="onSubmit">
          <FieldGroup>
            <Field :data-invalid="shouldShowEmailError">
              <FieldLabel for="email"> Email </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autocomplete="email"
                :aria-invalid="shouldShowEmailError"
                v-model="email"
                @blur="handleEmailBlur"
              />
              <FieldError v-if="shouldShowEmailError" :errors="[emailError]" />
            </Field>
            <Field :data-invalid="shouldShowPasswordError">
              <FieldLabel for="password"> Password </FieldLabel>

              <Input
                id="password"
                type="password"
                autocomplete="current-password"
                :aria-invalid="shouldShowPasswordError"
                v-model="password"
                @blur="handlePasswordBlur"
              />
              <FieldError
                v-if="shouldShowPasswordError"
                :errors="[passwordError]"
              />
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="checkout-7j9-same-as-shipping-wgm"
                :default-value="true"
              />
              <FieldLabel
                for="checkout-7j9-same-as-shipping-wgm"
                class="font-normal"
              >
                Remember me
              </FieldLabel>
            </Field>
            <FieldError v-if="submitError" :errors="[submitError]" />
            <Field>
              <Button
                type="submit"
                :disabled="
                  shouldShowEmailError ||
                  shouldShowPasswordError ||
                  isSubmitting
                "
              >
                {{ "Sign in" }}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
